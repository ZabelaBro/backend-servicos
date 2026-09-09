export class RelatorioDesempenho {
  private dataInicio: Date;
  private dataFim: Date;
  private totalChamados: number;
  private totalConcluidos: number;
  private tempoMedioAtendimentoHoras: number;
  private satisfacaoMedia: number;
  private dataGeracao: Date;

  constructor(params: {
    dataInicio: Date;
    dataFim: Date;
    totalChamados?: number;
    totalConcluidos?: number;
    tempoMedioAtendimentoHoras?: number;
    satisfacaoMedia?: number;
    dataGeracao?: Date;
  }) {
    this.dataInicio = params.dataInicio;
    this.dataFim = params.dataFim;
    this.totalChamados = params.totalChamados ?? 0;
    this.totalConcluidos = params.totalConcluidos ?? 0;
    this.tempoMedioAtendimentoHoras = params.tempoMedioAtendimentoHoras ?? 0;
    this.satisfacaoMedia = params.satisfacaoMedia ?? 0;
    this.dataGeracao = params.dataGeracao ?? new Date();
  }

  public getDataInicio(): Date {
    return this.dataInicio;
  }

  public getDataFim(): Date {
    return this.dataFim;
  }

  public getTotalChamados(): number {
    return this.totalChamados;
  }

  public getTotalConcluidos(): number {
    return this.totalConcluidos;
  }

  public getTempoMedioAtendimentoHoras(): number {
    return this.tempoMedioAtendimentoHoras;
  }

  public getSatisfacaoMedia(): number {
    return this.satisfacaoMedia;
  }

  public getDataGeracao(): Date {
    return this.dataGeracao;
  }
}

