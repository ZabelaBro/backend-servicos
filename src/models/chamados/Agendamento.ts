import { StatusAgendamento } from '../enums/StatusAgendamento';

export class Agendamento {
  private id: number | null;
  private dataHoraInicio: Date;
  private dataHoraFim: Date;
  private status: StatusAgendamento;
  private confirmadoCliente: boolean;
  private dataConfirmacao: Date | null;

  constructor(params: {
    id?: number | null;
    dataHoraInicio: Date;
    dataHoraFim: Date;
    status?: StatusAgendamento;
    confirmadoCliente?: boolean;
    dataConfirmacao?: Date | null;
  }) {
    this.id = params.id ?? null;
    this.dataHoraInicio = params.dataHoraInicio;
    this.dataHoraFim = params.dataHoraFim;
    this.status = params.status ?? StatusAgendamento.PROPOSTO;
    this.confirmadoCliente = params.confirmadoCliente ?? false;
    this.dataConfirmacao = params.dataConfirmacao ?? null;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number | null): void {
    this.id = id;
  }

  public getDataHoraInicio(): Date {
    return this.dataHoraInicio;
  }

  public setDataHoraInicio(data: Date): void {
    this.dataHoraInicio = data;
  }

  public getDataHoraFim(): Date {
    return this.dataHoraFim;
  }

  public setDataHoraFim(data: Date): void {
    this.dataHoraFim = data;
  }

  public getStatus(): StatusAgendamento {
    return this.status;
  }

  public setStatus(status: StatusAgendamento): void {
    this.status = status;
  }

  public isConfirmadoCliente(): boolean {
    return this.confirmadoCliente;
  }

  public getDataConfirmacao(): Date | null {
    return this.dataConfirmacao;
  }

  public confirmar(): void {
    this.status = StatusAgendamento.CONFIRMADO;
    this.confirmadoCliente = true;
    this.dataConfirmacao = new Date();
  }

  public reagendar(novaDataInicio: Date, novaDataFim?: Date): void {
    const duracaoMs = this.dataHoraFim.getTime() - this.dataHoraInicio.getTime();
    this.dataHoraInicio = novaDataInicio;
    this.dataHoraFim = novaDataFim ?? new Date(novaDataInicio.getTime() + duracaoMs);
    this.status = StatusAgendamento.REAGENDADO;
    this.confirmadoCliente = false;
    this.dataConfirmacao = null;
  }

  public possuiConflito(outro: Agendamento): boolean {
    // Conflito se o intervalo se sobrepõe e nenhum dos agendamentos está cancelado
    if (
      this.status === StatusAgendamento.CANCELADO ||
      outro.getStatus() === StatusAgendamento.CANCELADO
    ) {
      return false;
    }

    return (
      this.dataHoraInicio < outro.getDataHoraFim() &&
      this.dataHoraFim > outro.getDataHoraInicio()
    );
  }
}

