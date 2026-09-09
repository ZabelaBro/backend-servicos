import { StatusChamado } from '../enums/StatusChamado';
import type { Usuario } from '../usuarios/Usuario';

export class HistoricoStatusChamado {
  private id: number | null;
  private statusAnterior: StatusChamado;
  private statusNovo: StatusChamado;
  private dataHora: Date;
  private observacao: string;
  private registradoPor: Usuario;

  constructor(params: {
    id?: number | null;
    statusAnterior: StatusChamado;
    statusNovo: StatusChamado;
    observacao: string;
    registradoPor: Usuario;
    dataHora?: Date;
  }) {
    this.id = params.id ?? null;
    this.statusAnterior = params.statusAnterior;
    this.statusNovo = params.statusNovo;
    this.observacao = params.observacao;
    this.registradoPor = params.registradoPor;
    this.dataHora = params.dataHora ?? new Date();
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number | null): void {
    this.id = id;
  }

  public getStatusAnterior(): StatusChamado {
    return this.statusAnterior;
  }

  public getStatusNovo(): StatusChamado {
    return this.statusNovo;
  }

  public getDataHora(): Date {
    return this.dataHora;
  }

  public getObservacao(): string {
    return this.observacao;
  }

  public getRegistradoPor(): Usuario {
    return this.registradoPor;
  }
}

