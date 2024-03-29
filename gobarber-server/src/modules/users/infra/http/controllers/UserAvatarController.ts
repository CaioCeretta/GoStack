import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserAvatarController {
  // eslint-disable-next-line consistent-return
  public async update(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    if (req.file) {
      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFilename: req.file.filename,
      });

      return res.json(classToClass(user));
    }
  }
}
