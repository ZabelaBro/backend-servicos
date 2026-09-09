import type { Tecnico } from '../usuarios/Tecnico';
import type { ChamadoManutencao } from '../chamados/ChamadoManutencao';

export class Avaliacao {
  private id: number | null;
  private nota: number;
  private comentario: string;
  private dataAvaliacao: Date;
  private respostaAdmin: string | null;
  private dataRespostaAdmin: Date | null;
  private publicado: boolean;
  private tecnico: Tecnico | null;
  private chamado: ChamadoManutencao | null;

  constructor(params: {
    id?: number | null;
    nota: number;
    comentario: string;
    tecnico?: Tecnico | null;
    chamado?: ChamadoManutencao | null;
    dataAvaliacao?: Date;
    respostaAdmin?: string | null;
    dataRespostaAdmin?: Date | null;
    publicado?: boolean;
  }) {
    if (params.nota < 1 || params.nota > 5) {
      throw new Error('A nota da avaliação deve estar entre 1 e 5.');
    }
    this.id = params.id ?? null;
    this.nota = params.nota;
    this.comentario = params.comentario;
    this.tecnico = params.tecnico ?? null;
    this.chamado = params.chamado ?? null;
    this.dataAvaliacao = params.dataAvaliacao ?? new Date();
    this.respostaAdmin = params.respostaAdmin ?? null;
    this.dataRespostaAdmin = params.dataRespostaAdmin ?? null;
    this.publicado = params.publicado ?? true;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number | null): void {
    this.id = id;
  }

  public getNota(): number {
    return this.nota;
  }

  public setNota(nota: number): void {
    if (nota < 1 || nota > 5) {
      throw new Error('A nota deve estar entre 1 e 5.');
    }
    this.nota = nota;
  }

  public getComentario(): string {
    return this.comentario;
  }

  public setComentario(comentario: string): void {
    this.comentario = comentario;
  }

  public getDataAvaliacao(): Date {
    return this.dataAvaliacao;
  }

  public getRespostaAdmin(): string | null {
    return this.respostaAdmin;
  }

  public getDataRespostaAdmin(): Date | null {
    return this.dataRespostaAdmin;
  }

  public isPublicado(): boolean {
    return this.publicado;
  }

  public setPublicado(publicado: boolean): void {
    this.publicado = publicado;
  }

  public getTecnico(): Tecnico | null {
    return this.tecnico;
  }

  public setTecnico(tecnico: Tecnico | null): void {
    this.tecnico = tecnico;
  }

  public getChamado(): ChamadoManutencao | null {
    return this.chamado;
  }

  public setChamado(chamado: ChamadoManutencao | null): void {
    this.chamado = chamado;
  }

  public responder(texto: string): void {
    this.respostaAdmin = texto;
    this.dataRespostaAdmin = new Date();
  }

  /**
   * Valida se a avaliação foi realizada dentro do prazo permitido (ex.: até 30 dias após conclusão do chamado).
   */
  public validarPrazo(): boolean {
    const prazoMaximoDias = 30;
    const diferencaMs = Date.now() - this.dataAvaliacao.getTime();
    const diferencaDias = diferencaMs / (1000 * 60 * 60 * 24);
    return diferencaDias <= prazoMaximoDias;
  }
}

