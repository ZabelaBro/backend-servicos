import { FinalidadeMidia } from '../enums/FinalidadeMidia';
import { TipoMidia } from '../enums/TipoMidia';

export class AnexoMidia {
  private id: number | null;
  private finalidade: FinalidadeMidia;
  private tipo: TipoMidia;
  private urlArquivo: string;
  private tamanhoBytes: number;
  private dataEnvio: Date;

  constructor(params: {
    id?: number | null;
    finalidade: FinalidadeMidia;
    tipo: TipoMidia;
    urlArquivo: string;
    tamanhoBytes: number;
    dataEnvio?: Date;
  }) {
    this.id = params.id ?? null;
    this.finalidade = params.finalidade;
    this.tipo = params.tipo;
    this.urlArquivo = params.urlArquivo;
    this.tamanhoBytes = params.tamanhoBytes;
    this.dataEnvio = params.dataEnvio ?? new Date();
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number | null): void {
    this.id = id;
  }

  public getFinalidade(): FinalidadeMidia {
    return this.finalidade;
  }

  public setFinalidade(finalidade: FinalidadeMidia): void {
    this.finalidade = finalidade;
  }

  public getTipo(): TipoMidia {
    return this.tipo;
  }

  public setTipo(tipo: TipoMidia): void {
    this.tipo = tipo;
  }

  public getUrlArquivo(): string {
    return this.urlArquivo;
  }

  public setUrlArquivo(urlArquivo: string): void {
    this.urlArquivo = urlArquivo;
  }

  public getTamanhoBytes(): number {
    return this.tamanhoBytes;
  }

  public setTamanhoBytes(tamanhoBytes: number): void {
    this.tamanhoBytes = tamanhoBytes;
  }

  public getDataEnvio(): Date {
    return this.dataEnvio;
  }

  public setDataEnvio(dataEnvio: Date): void {
    this.dataEnvio = dataEnvio;
  }
}

