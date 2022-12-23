import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    if (req.file) {
      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFileName: req.file.filename,
      });

      // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
      delete user.password;

      return res.json(user);
    }
  }
}
