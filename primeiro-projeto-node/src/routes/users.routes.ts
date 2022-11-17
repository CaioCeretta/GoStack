import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const upload = multer(uploadConfig);

const usersRouter = Router();
/** Reminder: Precisamos do service se possuímos regra de negócio, caso contrário, poderiamos usar apenas o repositorio */

usersRouter.post('/', async (req, res) => {
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
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    if (req.file) {
      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFileName: req.file.filename,
      });

      // @ts-expect-error Apenas um paliativo para contornar o erro, aqui vai ocorrer um erro, mas estou ignorando
      delete user.password;

      return res.json(user);
    }
  },
);

export default usersRouter;
