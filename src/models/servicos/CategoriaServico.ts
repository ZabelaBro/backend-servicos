import { TipoServico } from './TipoServico';

export class CategoriaServico {
  private id: number | null;
  private nome: string;
  private descricao: string;
  private riscoInerente: boolean;
  private exigeFotoObrigatoria: boolean;
  private tiposServico: TipoServico[];

  constructor(params: {
    id?: number | null;
    nome: string;
    descricao: string;
    riscoInerente: boolean;
    exigeFotoObrigatoria: boolean;
    tiposServico?: TipoServico[];
  }) {
    this.id = params.id ?? null;
    this.nome = params.nome;
    this.descricao = params.descricao;
    this.riscoInerente = params.riscoInerente;
    this.exigeFotoObrigatoria = params.exigeFotoObrigatoria;
    this.tiposServico = params.tiposServico ?? [];
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

  public isRiscoInerente(): boolean {
    return this.riscoInerente;
  }

  public setRiscoInerente(riscoInerente: boolean): void {
    this.riscoInerente = riscoInerente;
  }

  public isExigeFotoObrigatoria(): boolean {
    return this.exigeFotoObrigatoria;
  }

  public setExigeFotoObrigatoria(exigeFotoObrigatoria: boolean): void {
    this.exigeFotoObrigatoria = exigeFotoObrigatoria;
  }

  public getTiposServico(): TipoServico[] {
    return [...this.tiposServico];
  }

  public adicionarTipoServico(tipo: TipoServico): void {
    tipo.setCategoria(this);
    this.tiposServico.push(tipo);
  }

  public removerTipoServico(tipoId: number): void {
    this.tiposServico = this.tiposServico.filter(t => t.getId() !== tipoId);
  }
}

