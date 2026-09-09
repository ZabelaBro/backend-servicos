export class AreaAtendimento {
  private id: number | null;
  private bairro: string;
  private cepInicial: string;
  private cepFinal: string;
  private cidade: string;
  private estado: string;

  constructor(params: {
    id?: number | null;
    bairro: string;
    cepInicial: string;
    cepFinal: string;
    cidade: string;
    estado: string;
  }) {
    this.id = params.id ?? null;
    this.bairro = params.bairro;
    this.cepInicial = params.cepInicial;
    this.cepFinal = params.cepFinal;
    this.cidade = params.cidade;
    this.estado = params.estado;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number | null): void {
    this.id = id;
  }

  public getBairro(): string {
    return this.bairro;
  }

  public setBairro(bairro: string): void {
    this.bairro = bairro;
  }

  public getCepInicial(): string {
    return this.cepInicial;
  }

  public setCepInicial(cepInicial: string): void {
    this.cepInicial = cepInicial;
  }

  public getCepFinal(): string {
    return this.cepFinal;
  }

  public setCepFinal(cepFinal: string): void {
    this.cepFinal = cepFinal;
  }

  public getCidade(): string {
    return this.cidade;
  }

  public setCidade(cidade: string): void {
    this.cidade = cidade;
  }

  public getEstado(): string {
    return this.estado;
  }

  public setEstado(estado: string): void {
    this.estado = estado;
  }

  /**
   * Valida se um determinado CEP está dentro da faixa atendida.
   * Normaliza removendo caracteres não numéricos.
   */
  public validaCep(cep: string): boolean {
    const limpo = cep.replace(/\D/g, '');
    const inicio = this.cepInicial.replace(/\D/g, '');
    const fim = this.cepFinal.replace(/\D/g, '');

    return limpo >= inicio && limpo <= fim;
  }
}

