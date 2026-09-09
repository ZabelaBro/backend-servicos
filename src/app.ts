import express, { Application, Request, Response } from 'express';
import {
  StatusUsuario,
  TipoImovel,
  Prioridade,
  StatusChamado,
  StatusAgendamento,
  StatusOrcamento,
  TipoMidia,
  FinalidadeMidia
} from './models';

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Backend de Serviços e Manutenção Predial/Residencial',
    status: 'online',
    version: '1.0.0'
  });
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/enums', (_req: Request, res: Response) => {
  res.json({
    StatusUsuario,
    TipoImovel,
    Prioridade,
    StatusChamado,
    StatusAgendamento,
    StatusOrcamento,
    TipoMidia,
    FinalidadeMidia
  });
});

export default app;

