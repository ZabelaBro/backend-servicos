import { Usuario } from './Usuario';
import { StatusUsuario } from '../enums/StatusUsuario';
import { Imovel } from '../imoveis/Imovel';
import { TipoServico } from '../servicos/TipoServico';
import { ChamadoManutencao } from '../chamados/ChamadoManutencao';
import { Orcamento } from '../chamados/Orcamento';
import { Avaliacao } from '../avaliacoes/Avaliacao';

export class Cliente extends Usuario {
  private codigoCliente: string;
  private imoveis: Imovel[];

  constructor(params: {
    id?: number | null;
    nomeCompleto: string;
    cpf: string;
    telefone: string;
    email: string;
    senhaHash: string;
    codigoCliente: string;
    status?: StatusUsuario;
    dataCadastro?: Date;
    imoveis?: Imovel[];
  }) {
    super(params);
    this.codigoCliente = params.codigoCliente;
    this.imoveis = params.imoveis ?? [];
  }

  public getCodigoCliente(): string {
    return this.codigoCliente;
  }

  public setCodigoCliente(codigo: string): void {
    this.codigoCliente = codigo;
  }

  public getImoveis(): Imovel[] {
    return [...this.imoveis];
  }

  public adicionarImovel(imovel: Imovel): void {
    this.imoveis.push(imovel);
  }

  public abrirChamado(imovel: Imovel, servico: TipoServico, desc: string): ChamadoManutencao {
    if (!this.imoveis.some(i => i === imovel || (i.getId() && i.getId() === imovel.getId()))) {
      this.adicionarImovel(imovel);
    }

    const categoria = servico.getCategoria();
    if (!categoria) {
      throw new Error('O serviço selecionado deve possuir uma categoria associada.');
    }

    const protocolo = `CHAM-${Date.now()}`;

    const chamado = new ChamadoManutencao({
      numeroProtocolo: protocolo,
      descricaoProblema: desc,
      cliente: this,
      imovel,
      categoria,
      tipoServico: servico
    });

    return chamado;
  }

  public aprovarOrcamento(orcamento: Orcamento): void {
    orcamento.aprovar();
  }

  public recusarOrcamento(orcamento: Orcamento): void {
    orcamento.recusar();
  }

  public avaliarAtendimento(chamado: ChamadoManutencao, nota: number, com: string): Avaliacao {
    const avaliacao = new Avaliacao({
      nota,
      comentario: com,
      chamado,
      tecnico: chamado.getTecnico()
    });

    chamado.setAvaliacao(avaliacao);
    return avaliacao;
  }
}

