import { Usuario } from './Usuario';
import { StatusUsuario } from '../enums/StatusUsuario';
import { Prioridade } from '../enums/Prioridade';
import type { ChamadoManutencao } from '../chamados/ChamadoManutencao';
import type { Tecnico } from './Tecnico';
import type { Avaliacao } from '../avaliacoes/Avaliacao';
import { RelatorioDesempenho } from '../avaliacoes/RelatorioDesempenho';

export class Administrador extends Usuario {
  private matricula: string;

  constructor(params: {
    id?: number | null;
    nomeCompleto: string;
    cpf: string;
    telefone: string;
    email: string;
    senhaHash: string;
    matricula: string;
    status?: StatusUsuario;
    dataCadastro?: Date;
  }) {
    super(params);
    this.matricula = params.matricula;
  }

  public getMatricula(): string {
    return this.matricula;
  }

  public setMatricula(matricula: string): void {
    this.matricula = matricula;
  }

  public classificarUrgencia(chamado: ChamadoManutencao, p: Prioridade): void {
    chamado.setPrioridade(p);
  }

  public atribuirTecnico(chamado: ChamadoManutencao, t: Tecnico): void {
    chamado.atribuirTecnico(t, this);
  }

  public responderAvaliacao(aval: Avaliacao, resposta: string): void {
    aval.responder(resposta);
  }

  public gerarRelatorioBI(inicio: Date, fim: Date): RelatorioDesempenho {
    // Retorna relatório de métricas no período
    return new RelatorioDesempenho({
      dataInicio: inicio,
      dataFim: fim,
      totalChamados: 0,
      totalConcluidos: 0,
      tempoMedioAtendimentoHoras: 0,
      satisfacaoMedia: 5.0
    });
  }
}

