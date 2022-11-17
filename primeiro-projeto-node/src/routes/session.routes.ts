import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

import AppError from '../errors/AppError';

const sessionsRouter = Router();

/** Reminder: Precisamos do service se possuímos regra de negócio, caso contrário, poderiamos usar apenas o repositorio */

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return res.json({ user, token });
});

export default sessionsRouter;
