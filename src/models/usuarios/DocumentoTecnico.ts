export class DocumentoTecnico {
  private id: number | null;
  private descricao: string;
  private caminhoArquivo: string;
  private dataEnvio: Date;

  constructor(params: {
    id?: number | null;
    descricao: string;
    caminhoArquivo: string;
    dataEnvio?: Date;
  }) {
    this.id = params.id ?? null;
    this.descricao = params.descricao;
    this.caminhoArquivo = params.caminhoArquivo;
    this.dataEnvio = params.dataEnvio ?? new Date();
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number | null): void {
    this.id = id;
  }

  public getDescricao(): string {
    return this.descricao;
  }

  public setDescricao(descricao: string): void {
    this.descricao = descricao;
  }

  public getCaminhoArquivo(): string {
    return this.caminhoArquivo;
  }

  public setCaminhoArquivo(caminhoArquivo: string): void {
    this.caminhoArquivo = caminhoArquivo;
  }

  public getDataEnvio(): Date {
    return this.dataEnvio;
  }

  public setDataEnvio(dataEnvio: Date): void {
    this.dataEnvio = dataEnvio;
  }
}

