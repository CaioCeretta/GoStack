import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

/** Reminder: Precisamos do service se possuímos regra de negócio, caso contrário, poderiamos usar apenas o repositorio */

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // @ts-expect-error Apenas um paliativo para contornar o erro, aqui vai ocorrer um erro, mas estou ignorando
    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
});

export default usersRouter;
