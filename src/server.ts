import { app } from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(PORT, () => {
  console.log(`[Servidor] Rodando com sucesso na porta ${PORT}`);
  console.log(`[Servidor] Healthcheck disponível em http://localhost:${PORT}/health`);
});

