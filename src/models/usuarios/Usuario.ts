import { StatusUsuario } from '../enums/StatusUsuario';

export abstract class Usuario {
  protected id: number | null;
  protected nomeCompleto: string;
  protected cpf: string;
  protected telefone: string;
  protected email: string;
  protected senhaHash: string;
  protected status: StatusUsuario;
  protected dataCadastro: Date;

  constructor(params: {
    id?: number | null;
    nomeCompleto: string;
    cpf: string;
    telefone: string;
    email: string;
    senhaHash: string;
    status?: StatusUsuario;
    dataCadastro?: Date;
  }) {
    this.id = params.id ?? null;
    this.nomeCompleto = params.nomeCompleto;
    this.cpf = params.cpf;
    this.telefone = params.telefone;
    this.email = params.email;
    this.senhaHash = params.senhaHash;
    this.status = params.status ?? StatusUsuario.ATIVO;
    this.dataCadastro = params.dataCadastro ?? new Date();
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number | null): void {
    this.id = id;
  }

  public getNomeCompleto(): string {
    return this.nomeCompleto;
  }

  public setNomeCompleto(nomeCompleto: string): void {
    this.nomeCompleto = nomeCompleto;
  }

  public getCpf(): string {
    return this.cpf;
  }

  public setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  public getTelefone(): string {
    return this.telefone;
  }

  public setTelefone(telefone: string): void {
    this.telefone = telefone;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getSenhaHash(): string {
    return this.senhaHash;
  }

  public setSenhaHash(senhaHash: string): void {
    this.senhaHash = senhaHash;
  }

  public getStatus(): StatusUsuario {
    return this.status;
  }

  public getDataCadastro(): Date {
    return this.dataCadastro;
  }

  public ativar(): void {
    this.status = StatusUsuario.ATIVO;
  }

  public inativar(): void {
    this.status = StatusUsuario.INATIVO;
  }

  public autenticar(senha: string): boolean {
    // Validação de autenticação básica ou hash comparison
    return this.status === StatusUsuario.ATIVO && this.senhaHash === senha;
  }
}

