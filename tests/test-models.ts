import {
  StatusUsuario,
  TipoImovel,
  Prioridade,
  StatusChamado,
  StatusAgendamento,
  StatusOrcamento,
  TipoMidia,
  FinalidadeMidia,
  Imovel,
  CategoriaServico,
  TipoServico,
  Cliente,
  Tecnico,
  Administrador,
  DocumentoTecnico,
  AreaAtendimento,
  ChamadoManutencao,
  AnexoMidia,
  Agendamento,
  Orcamento,
  Avaliacao,
  RelatorioDesempenho
} from '../src/models';

console.log('=== INICIANDO TESTES DOS MODELOS DO DOMÍNIO ===\n');

// 1. Teste de Imóvel
console.log('1. Testando Imovel...');
const imovel = new Imovel({
  id: 1,
  apelido: 'Casa de Praia',
  tipo: TipoImovel.CASA,
  logradouro: 'Av. Beira Mar',
  numero: '100',
  complemento: 'Casa 2',
  bairro: 'Centro',
  cep: '11000-000',
  cidade: 'Santos',
  estado: 'SP'
});
console.log('Endereço completo:', imovel.getEnderecoCompleto());
if (!imovel.getEnderecoCompleto().includes('Santos/SP')) {
  throw new Error('Falha no getEnderecoCompleto do Imóvel');
}

// 2. Teste de Catálogo de Serviços
console.log('\n2. Testando Catálogo de Serviços...');
const catEletrica = new CategoriaServico({
  id: 1,
  nome: 'Elétrica',
  descricao: 'Serviços de instalações e reparos elétricos',
  riscoInerente: true,
  exigeFotoObrigatoria: true
});

const servTrocaDisjuntor = new TipoServico({
  id: 10,
  nome: 'Troca de Disjuntor',
  descricao: 'Substituição de disjuntor padrão DIN',
  valorReferencia: 150.00
});

catEletrica.adicionarTipoServico(servTrocaDisjuntor);
console.log(`Categoria ${catEletrica.getNome()} possui ${catEletrica.getTiposServico().length} serviços.`);

// 3. Teste de Área de Atendimento e Documento do Técnico
console.log('\n3. Testando Área de Atendimento e Documentos...');
const areaLitoral = new AreaAtendimento({
  id: 1,
  bairro: 'Centro',
  cepInicial: '11000-000',
  cepFinal: '11099-999',
  cidade: 'Santos',
  estado: 'SP'
});

console.log('Validação de CEP 11050-000:', areaLitoral.validaCep('11050-000')); // true
console.log('Validação de CEP 01000-000:', areaLitoral.validaCep('01000-000')); // false
if (!areaLitoral.validaCep('11050-000') || areaLitoral.validaCep('01000-000')) {
  throw new Error('Falha na validação de CEP da Área de Atendimento');
}

const docCrea = new DocumentoTecnico({
  id: 1,
  descricao: 'Certidão CFT/CREA',
  caminhoArquivo: '/uploads/crea_123.pdf'
});

// 4. Teste de Usuários (Cliente, Técnico, Administrador)
console.log('\n4. Testando Atores e Perfis...');
const cliente = new Cliente({
  id: 101,
  nomeCompleto: 'Maria da Silva',
  cpf: '123.456.789-00',
  telefone: '(13) 99999-1111',
  email: 'maria@email.com',
  senhaHash: 'hash_senha_123',
  codigoCliente: 'CLI-001'
});
cliente.adicionarImovel(imovel);

const tecnico = new Tecnico({
  id: 201,
  nomeCompleto: 'Carlos Eletricista',
  cpf: '987.654.321-99',
  telefone: '(13) 98888-2222',
  email: 'carlos@tecnico.com',
  senhaHash: 'hash_senha_456',
  codigoTecnico: 'TEC-55'
});
tecnico.adicionarAreaAtendimento(areaLitoral);
tecnico.adicionarDocumento(docCrea);
tecnico.adicionarEspecialidade(catEletrica);

console.log('Técnico atende 11050-000:', tecnico.atendeRegiao('11050-000'));
console.log('Técnico possui especialidade Elétrica:', tecnico.possuiEspecialidade(catEletrica));

const admin = new Administrador({
  id: 301,
  nomeCompleto: 'Ana Gerente',
  cpf: '111.222.333-44',
  telefone: '(11) 97777-3333',
  email: 'ana@admin.com',
  senhaHash: 'hash_admin_789',
  matricula: 'ADM-1001'
});

// 5. Teste de Fluxo Completo de Chamado
console.log('\n5. Testando Fluxo de Chamado...');
const chamado = cliente.abrirChamado(imovel, servicoTrocaDisjuntor(servTrocaDisjuntor), 'Disjuntor desarmando constantemente');
console.log(`Chamado aberto com protocolo: ${chamado.getNumeroProtocolo()}, status: ${chamado.getStatus()}`);

// Admin classifica urgência e atribui técnico
admin.classificarUrgencia(chamado, Prioridade.ALTA);
admin.atribuirTecnico(chamado, tecnico);
console.log(`Prioridade: ${chamado.getPrioridade()}, Novo status: ${chamado.getStatus()}, Técnico: ${chamado.getTecnico()?.getNomeCompleto()}`);

// Agendamento
const inicioAgendamento = new Date(Date.now() + 3600000);
const fimAgendamento = new Date(Date.now() + 7200000);
const agendamento = new Agendamento({
  id: 1,
  dataHoraInicio: inicioAgendamento,
  dataHoraFim: fimAgendamento
});
agendamento.confirmar();
chamado.adicionarAgendamento(agendamento);

// Técnico inicia atendimento
tecnico.registrarInicioAtendimento(chamado);
console.log(`Status após início de atendimento: ${chamado.getStatus()}`);

// Técnico lança orçamento
const orcamento = tecnico.lancarOrcamento(chamado, 80.00, 120.00);
console.log(`Orçamento gerado: R$ ${orcamento.getValorTotal()}, Status do chamado: ${chamado.getStatus()}`);

// Cliente aprova orçamento
cliente.aprovarOrcamento(orcamento);
console.log(`Status do orçamento após aprovação: ${orcamento.getStatus()}`);

// Técnico conclui com fotos
const fotoProblema = new AnexoMidia({
  finalidade: FinalidadeMidia.ABERTURA_PROBLEMA,
  tipo: TipoMidia.FOTO,
  urlArquivo: 'https://storage.exemplo.com/foto1.jpg',
  tamanhoBytes: 204800
});
const fotoConclusao = new AnexoMidia({
  finalidade: FinalidadeMidia.CONCLUSAO_SERVICO,
  tipo: TipoMidia.FOTO,
  urlArquivo: 'https://storage.exemplo.com/foto2.jpg',
  tamanhoBytes: 304800
});
tecnico.registrarConclusao(chamado, [fotoProblema, fotoConclusao]);
console.log(`Status após conclusão: ${chamado.getStatus()}, Anexos: ${chamado.getAnexos().length}`);

// Cliente avalia atendimento
const avaliacao = cliente.avaliarAtendimento(chamado, 5, 'Excelente serviço, muito rápido e atencioso!');
console.log(`Avaliação: Nota ${avaliacao.getNota()}, Comentário: "${avaliacao.getComentario()}"`);

// Admin responde avaliação
admin.responderAvaliacao(avaliacao, 'Obrigado pelo feedback, Maria! Ficamos felizes em ajudar.');
console.log(`Resposta do Admin: "${avaliacao.getRespostaAdmin()}"`);

// Reabertura do chamado
console.log(`Chamado pode ser reaberto? ${chamado.podeSerReaberto()}`);
const chamadoReaberto = chamado.reabrir('O disjuntor voltou a chiar.');
console.log(`Chamado reaberto! Protocolo: ${chamadoReaberto.getNumeroProtocolo()}, Origem: ${chamadoReaberto.getChamadoOrigem()?.getNumeroProtocolo()}`);

// Relatório BI
const relatorio = admin.gerarRelatorioBI(new Date('2026-01-01'), new Date('2026-12-31'));
console.log(`Relatório BI gerado para período ${relatorio.getDataInicio().toISOString()} a ${relatorio.getDataFim().toISOString()}`);

console.log('\n=== TODOS OS TESTES FORAM CONCLUÍDOS COM SUCESSO! ===');

function servicoTrocaDisjuntor(s: TipoServico): TipoServico {
  return s;
}

