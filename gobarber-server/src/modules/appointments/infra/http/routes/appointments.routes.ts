import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsController = new AppointmentsController();

const appointmentsRouter = Router();

/* Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta
Se fizermos algo além disso, nós iremos querer abstrair essa lógica dentro de um service */

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   console.log(req.user);

//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
