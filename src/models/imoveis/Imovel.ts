import { TipoImovel } from '../enums/TipoImovel';

export class Imovel {
  private id: number | null;
  private apelido: string;
  private tipo: TipoImovel;
  private logradouro: string;
  private numero: string;
  private complemento: string;
  private bairro: string;
  private cep: string;
  private cidade: string;
  private estado: string;

  constructor(params: {
    id?: number | null;
    apelido: string;
    tipo: TipoImovel;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
  }) {
    this.id = params.id ?? null;
    this.apelido = params.apelido;
    this.tipo = params.tipo;
    this.logradouro = params.logradouro;
    this.numero = params.numero;
    this.complemento = params.complemento ?? '';
    this.bairro = params.bairro;
    this.cep = params.cep;
    this.cidade = params.cidade;
    this.estado = params.estado;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number | null): void {
    this.id = id;
  }

  public getApelido(): string {
    return this.apelido;
  }

  public setApelido(apelido: string): void {
    this.apelido = apelido;
  }

  public getTipo(): TipoImovel {
    return this.tipo;
  }

  public setTipo(tipo: TipoImovel): void {
    this.tipo = tipo;
  }

  public getLogradouro(): string {
    return this.logradouro;
  }

  public setLogradouro(logradouro: string): void {
    this.logradouro = logradouro;
  }

  public getNumero(): string {
    return this.numero;
  }

  public setNumero(numero: string): void {
    this.numero = numero;
  }

  public getComplemento(): string {
    return this.complemento;
  }

  public setComplemento(complemento: string): void {
    this.complemento = complemento;
  }

  public getBairro(): string {
    return this.bairro;
  }

  public setBairro(bairro: string): void {
    this.bairro = bairro;
  }

  public getCep(): string {
    return this.cep;
  }

  public setCep(cep: string): void {
    this.cep = cep;
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

  public getEnderecoCompleto(): string {
    const comp = this.complemento ? ` (${this.complemento})` : '';
    return `${this.logradouro}, ${this.numero}${comp}, ${this.bairro} - ${this.cidade}/${this.estado}, CEP: ${this.cep}`;
  }
}

