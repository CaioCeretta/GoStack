import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // console.log(user);

    return res.json({ user, token });
  }
}
