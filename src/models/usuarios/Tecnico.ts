import { Usuario } from './Usuario';
import { StatusUsuario } from '../enums/StatusUsuario';
import { StatusChamado } from '../enums/StatusChamado';
import { DocumentoTecnico } from './DocumentoTecnico';
import { AreaAtendimento } from './AreaAtendimento';
import { CategoriaServico } from '../servicos/CategoriaServico';
import { ChamadoManutencao } from '../chamados/ChamadoManutencao';
import { Orcamento } from '../chamados/Orcamento';
import { AnexoMidia } from '../chamados/AnexoMidia';

export class Tecnico extends Usuario {
  private codigoTecnico: string;
  private documentos: DocumentoTecnico[];
  private areasAtendimento: AreaAtendimento[];
  private especialidades: CategoriaServico[];

  constructor(params: {
    id?: number | null;
    nomeCompleto: string;
    cpf: string;
    telefone: string;
    email: string;
    senhaHash: string;
    codigoTecnico: string;
    status?: StatusUsuario;
    dataCadastro?: Date;
    documentos?: DocumentoTecnico[];
    areasAtendimento?: AreaAtendimento[];
    especialidades?: CategoriaServico[];
  }) {
    super(params);
    this.codigoTecnico = params.codigoTecnico;
    this.documentos = params.documentos ?? [];
    this.areasAtendimento = params.areasAtendimento ?? [];
    this.especialidades = params.especialidades ?? [];
  }

  public getCodigoTecnico(): string {
    return this.codigoTecnico;
  }

  public setCodigoTecnico(codigo: string): void {
    this.codigoTecnico = codigo;
  }

  public getDocumentos(): DocumentoTecnico[] {
    return [...this.documentos];
  }

  public adicionarDocumento(doc: DocumentoTecnico): void {
    this.documentos.push(doc);
  }

  public getAreasAtendimento(): AreaAtendimento[] {
    return [...this.areasAtendimento];
  }

  public adicionarAreaAtendimento(area: AreaAtendimento): void {
    this.areasAtendimento.push(area);
  }

  public getEspecialidades(): CategoriaServico[] {
    return [...this.especialidades];
  }

  public adicionarEspecialidade(categoria: CategoriaServico): void {
    this.especialidades.push(categoria);
  }

  public registrarInicioAtendimento(chamado: ChamadoManutencao): void {
    chamado.alterarStatus(
      StatusChamado.EM_ATENDIMENTO,
      this,
      `Atendimento iniciado pelo técnico ${this.getNomeCompleto()}`
    );
  }

  public lancarOrcamento(chamado: ChamadoManutencao, pecas: number, maoObra: number): Orcamento {
    const dataExpiracao = new Date();
    dataExpiracao.setDate(dataExpiracao.getDate() + 5); // 5 dias de validade padrão

    const orcamento = new Orcamento({
      valorPecas: pecas,
      valorMaoDeObra: maoObra,
      descricaoDetalhada: `Orçamento para chamado ${chamado.getNumeroProtocolo()}`,
      dataExpiracao
    });

    chamado.setOrcamento(orcamento);
    chamado.alterarStatus(
      StatusChamado.AGUARDANDO_APROVACAO_ORCAMENTO,
      this,
      `Orçamento lançado no valor total de R$ ${orcamento.getValorTotal()}`
    );

    return orcamento;
  }

  public registrarConclusao(chamado: ChamadoManutencao, fotos: AnexoMidia[]): void {
    for (const foto of fotos) {
      chamado.adicionarAnexo(foto);
    }

    chamado.alterarStatus(
      StatusChamado.CONCLUIDO,
      this,
      `Serviço concluído pelo técnico ${this.getNomeCompleto()}`
    );
  }

  public atendeRegiao(cep: string): boolean {
    return this.areasAtendimento.some(area => area.validaCep(cep));
  }

  public possuiEspecialidade(cat: CategoriaServico): boolean {
    return this.especialidades.some(
      esp => esp === cat || (esp.getId() && esp.getId() === cat.getId())
    );
  }
}

