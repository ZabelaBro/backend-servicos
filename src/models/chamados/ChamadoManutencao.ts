import { StatusChamado } from '../enums/StatusChamado';
import { Prioridade } from '../enums/Prioridade';
import type { Cliente } from '../usuarios/Cliente';
import type { Tecnico } from '../usuarios/Tecnico';
import type { Administrador } from '../usuarios/Administrador';
import type { Usuario } from '../usuarios/Usuario';
import type { Imovel } from '../imoveis/Imovel';
import type { CategoriaServico } from '../servicos/CategoriaServico';
import type { TipoServico } from '../servicos/TipoServico';
import { HistoricoStatusChamado } from './HistoricoStatusChamado';
import { AnexoMidia } from './AnexoMidia';
import { Agendamento } from './Agendamento';
import { Orcamento } from './Orcamento';
import type { Avaliacao } from '../avaliacoes/Avaliacao';

export class ChamadoManutencao {
  private id: number | null;
  private numeroProtocolo: string;
  private descricaoProblema: string;
  private prioridade: Prioridade;
  private status: StatusChamado;
  private dataAbertura: Date;
  private dataConclusao: Date | null;
  private dataLimiteReabertura: Date | null;

  private cliente: Cliente;
  private imovel: Imovel;
  private categoria: CategoriaServico;
  private tipoServico: TipoServico;
  private tecnico: Tecnico | null;
  private chamadoOrigem: ChamadoManutencao | null;

  private historicoStatus: HistoricoStatusChamado[];
  private anexos: AnexoMidia[]; // máx 5
  private agendamentos: Agendamento[];
  private orcamento: Orcamento | null;
  private avaliacao: Avaliacao | null;

  constructor(params: {
    id?: number | null;
    numeroProtocolo: string;
    descricaoProblema: string;
    prioridade?: Prioridade;
    status?: StatusChamado;
    cliente: Cliente;
    imovel: Imovel;
    categoria: CategoriaServico;
    tipoServico: TipoServico;
    tecnico?: Tecnico | null;
    chamadoOrigem?: ChamadoManutencao | null;
    dataAbertura?: Date;
    dataConclusao?: Date | null;
    dataLimiteReabertura?: Date | null;
    anexos?: AnexoMidia[];
    agendamentos?: Agendamento[];
    orcamento?: Orcamento | null;
    avaliacao?: Avaliacao | null;
  }) {
    this.id = params.id ?? null;
    this.numeroProtocolo = params.numeroProtocolo;
    this.descricaoProblema = params.descricaoProblema;
    this.prioridade = params.prioridade ?? Prioridade.MEDIA;
    this.status = params.status ?? StatusChamado.ABERTO;
    this.cliente = params.cliente;
    this.imovel = params.imovel;
    this.categoria = params.categoria;
    this.tipoServico = params.tipoServico;
    this.tecnico = params.tecnico ?? null;
    this.chamadoOrigem = params.chamadoOrigem ?? null;
    this.dataAbertura = params.dataAbertura ?? new Date();
    this.dataConclusao = params.dataConclusao ?? null;
    this.dataLimiteReabertura = params.dataLimiteReabertura ?? null;

    this.anexos = [];
    if (params.anexos) {
      for (const anexo of params.anexos) {
        this.adicionarAnexo(anexo);
      }
    }

    this.agendamentos = params.agendamentos ?? [];
    this.orcamento = params.orcamento ?? null;
    this.avaliacao = params.avaliacao ?? null;

    // Registro inicial do histórico
    this.historicoStatus = [
      new HistoricoStatusChamado({
        statusAnterior: this.status,
        statusNovo: this.status,
        observacao: 'Abertura do chamado',
        registradoPor: this.cliente as unknown as Usuario,
        dataHora: this.dataAbertura
      })
    ];
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number | null): void {
    this.id = id;
  }

  public getNumeroProtocolo(): string {
    return this.numeroProtocolo;
  }

  public getDescricaoProblema(): string {
    return this.descricaoProblema;
  }

  public setDescricaoProblema(descricao: string): void {
    this.descricaoProblema = descricao;
  }

  public getPrioridade(): Prioridade {
    return this.prioridade;
  }

  public setPrioridade(prioridade: Prioridade): void {
    this.prioridade = prioridade;
  }

  public getStatus(): StatusChamado {
    return this.status;
  }

  public getDataAbertura(): Date {
    return this.dataAbertura;
  }

  public getDataConclusao(): Date | null {
    return this.dataConclusao;
  }

  public getDataLimiteReabertura(): Date | null {
    return this.dataLimiteReabertura;
  }

  public getCliente(): Cliente {
    return this.cliente;
  }

  public getImovel(): Imovel {
    return this.imovel;
  }

  public getCategoria(): CategoriaServico {
    return this.categoria;
  }

  public getTipoServico(): TipoServico {
    return this.tipoServico;
  }

  public getTecnico(): Tecnico | null {
    return this.tecnico;
  }

  public getChamadoOrigem(): ChamadoManutencao | null {
    return this.chamadoOrigem;
  }

  public getHistoricoStatus(): HistoricoStatusChamado[] {
    return [...this.historicoStatus];
  }

  public getAnexos(): AnexoMidia[] {
    return [...this.anexos];
  }

  public getAgendamentos(): Agendamento[] {
    return [...this.agendamentos];
  }

  public getOrcamento(): Orcamento | null {
    return this.orcamento;
  }

  public setOrcamento(orcamento: Orcamento | null): void {
    this.orcamento = orcamento;
  }

  public getAvaliacao(): Avaliacao | null {
    return this.avaliacao;
  }

  public setAvaliacao(avaliacao: Avaliacao | null): void {
    this.avaliacao = avaliacao;
  }

  public adicionarAnexo(anexo: AnexoMidia): void {
    if (this.anexos.length >= 5) {
      throw new Error('Limite máximo de 5 anexos de mídia atingido.');
    }
    this.anexos.push(anexo);
  }

  public adicionarAgendamento(agendamento: Agendamento): void {
    this.agendamentos.push(agendamento);
  }

  public alterarStatus(novoStatus: StatusChamado, responsavel: Usuario, motivo: string): void {
    const statusAnterior = this.status;
    this.status = novoStatus;

    if (novoStatus === StatusChamado.CONCLUIDO) {
      this.dataConclusao = new Date();
      // Define prazo de reabertura para 7 dias corridos após conclusão
      const limite = new Date(this.dataConclusao);
      limite.setDate(limite.getDate() + 7);
      this.dataLimiteReabertura = limite;
    }

    this.historicoStatus.push(
      new HistoricoStatusChamado({
        statusAnterior,
        statusNovo: novoStatus,
        observacao: motivo,
        registradoPor: responsavel,
        dataHora: new Date()
      })
    );
  }

  public atribuirTecnico(tec: Tecnico, adm: Administrador): void {
    this.tecnico = tec;
    this.alterarStatus(
      StatusChamado.EM_ANALISE,
      adm as unknown as Usuario,
      `Técnico ${tec.getNomeCompleto()} atribuído pelo administrador.`
    );
  }

  public cancelar(solicitante: Usuario, motivo: string): void {
    if (this.status === StatusChamado.CONCLUIDO) {
      throw new Error('Não é possível cancelar um chamado já concluído.');
    }
    this.alterarStatus(StatusChamado.CANCELADO, solicitante, `Cancelado: ${motivo}`);
  }

  public podeSerReaberto(): boolean {
    if (this.status !== StatusChamado.CONCLUIDO) {
      return false;
    }
    if (!this.dataLimiteReabertura) {
      return false;
    }
    return new Date() <= this.dataLimiteReabertura;
  }

  public reabrir(justificativa: string): ChamadoManutencao {
    if (!this.podeSerReaberto()) {
      throw new Error('Este chamado não pode ser reaberto fora do prazo ou sem estar concluído.');
    }

    const protocoloReabertura = `${this.numeroProtocolo}-R1`;

    const novoChamado = new ChamadoManutencao({
      numeroProtocolo: protocoloReabertura,
      descricaoProblema: `Reabertura referente ao chamado ${this.numeroProtocolo}. Justificativa: ${justificativa}`,
      prioridade: this.prioridade,
      status: StatusChamado.ABERTO,
      cliente: this.cliente,
      imovel: this.imovel,
      categoria: this.categoria,
      tipoServico: this.tipoServico,
      tecnico: this.tecnico,
      chamadoOrigem: this
    });

    return novoChamado;
  }
}

