import type { CategoriaServico } from './CategoriaServico';

export class TipoServico {
  private id: number | null;
  private nome: string;
  private descricao: string;
  private valorReferencia: number;
  private categoria?: CategoriaServico | null;

  constructor(params: {
    id?: number | null;
    nome: string;
    descricao: string;
    valorReferencia: number;
    categoria?: CategoriaServico | null;
  }) {
    this.id = params.id ?? null;
    this.nome = params.nome;
    this.descricao = params.descricao;
    this.valorReferencia = params.valorReferencia;
    this.categoria = params.categoria ?? null;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number | null): void {
    this.id = id;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getDescricao(): string {
    return this.descricao;
  }

  public setDescricao(descricao: string): void {
    this.descricao = descricao;
  }

  public getValorReferencia(): number {
    return this.valorReferencia;
  }

  public setValorReferencia(valorReferencia: number): void {
    this.valorReferencia = valorReferencia;
  }

  public getCategoria(): CategoriaServico | null | undefined {
    return this.categoria;
  }

  public setCategoria(categoria: CategoriaServico | null): void {
    this.categoria = categoria;
  }
}

