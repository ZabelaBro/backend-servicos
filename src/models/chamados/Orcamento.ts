import { StatusOrcamento } from '../enums/StatusOrcamento';

export class Orcamento {
  private id: number | null;
  private valorPecas: number;
  private valorMaoDeObra: number;
  private valorTotal: number;
  private descricaoDetalhada: string;
  private status: StatusOrcamento;
  private dataRegistro: Date;
  private dataExpiracao: Date;
  private dataResposta: Date | null;

  constructor(params: {
    id?: number | null;
    valorPecas: number;
    valorMaoDeObra: number;
    descricaoDetalhada: string;
    dataExpiracao: Date;
    status?: StatusOrcamento;
    dataRegistro?: Date;
    dataResposta?: Date | null;
  }) {
    this.id = params.id ?? null;
    this.valorPecas = params.valorPecas;
    this.valorMaoDeObra = params.valorMaoDeObra;
    this.descricaoDetalhada = params.descricaoDetalhada;
    this.status = params.status ?? StatusOrcamento.PENDENTE;
    this.dataRegistro = params.dataRegistro ?? new Date();
    this.dataExpiracao = params.dataExpiracao;
    this.dataResposta = params.dataResposta ?? null;
    this.valorTotal = this.calcularTotal();
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number | null): void {
    this.id = id;
  }

  public getValorPecas(): number {
    return this.valorPecas;
  }

  public setValorPecas(valor: number): void {
    this.valorPecas = valor;
    this.valorTotal = this.calcularTotal();
  }

  public getValorMaoDeObra(): number {
    return this.valorMaoDeObra;
  }

  public setValorMaoDeObra(valor: number): void {
    this.valorMaoDeObra = valor;
    this.valorTotal = this.calcularTotal();
  }

  public getValorTotal(): number {
    return this.valorTotal;
  }

  public getDescricaoDetalhada(): string {
    return this.descricaoDetalhada;
  }

  public setDescricaoDetalhada(descricao: string): void {
    this.descricaoDetalhada = descricao;
  }

  public getStatus(): StatusOrcamento {
    return this.status;
  }

  public getDataRegistro(): Date {
    return this.dataRegistro;
  }

  public getDataExpiracao(): Date {
    return this.dataExpiracao;
  }

  public setDataExpiracao(data: Date): void {
    this.dataExpiracao = data;
  }

  public getDataResposta(): Date | null {
    return this.dataResposta;
  }

  public calcularTotal(): number {
    return Number((this.valorPecas + this.valorMaoDeObra).toFixed(2));
  }

  public estaVencido(): boolean {
    const agora = new Date();
    return agora > this.dataExpiracao;
  }

  public aprovar(): void {
    if (this.estaVencido()) {
      this.status = StatusOrcamento.EXPIRADO;
      throw new Error('Não é possível aprovar um orçamento expirado.');
    }
    this.status = StatusOrcamento.APROVADO;
    this.dataResposta = new Date();
  }

  public recusar(): void {
    this.status = StatusOrcamento.RECUSADO;
    this.dataResposta = new Date();
  }
}

