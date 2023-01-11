import { getHours, isBefore, startOfHour, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
/**
 * [X] Recebimento das informações
 * [/]Tratativa de erros e exceções
 * [/]Acesso ao repositório
 */

interface IRequest {
  date: Date;
  user_id: string;
  provider_id: string;
}

/**
 * Dependency Inversion
 * - Sempre que ele tiver uma dependencia externa, como por exemplo, o appointmentrepository, ao invés de instanciarmos
 * esta classe, nós iremos recebe-lo como um parametro do nosso constructor do serviço, desta maneira, independentemente
 * de quantos serviços estejam trabalhando com a parte de appointment, todas estarão usando o mesmo repositorio
 * de appointments
 */

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    date,
    user_id,
    provider_id,
  }: IRequest): Promise<Appointment> {
    const appointmentHour = startOfHour(date);

    // console.log(user_id);

    if (isBefore(appointmentHour, Date.now())) {
      throw new AppError(
        "It isn't possible to create an appointment on a past date",
      );
    }

    if (user_id === provider_id) {
      throw new AppError('You should not create an appointment with yousrelf');
    }

    if (getHours(appointmentHour) < 8 || getHours(appointmentHour) > 17) {
      throw new AppError(
        'You can only create an appointment after 8AM and before 17pm',
      );
    }

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentHour);

    if (findAppointmentInSameDate) {
      throw new AppError('This hour is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentHour,
    });

    // Estou ciente que não precisava ter 'escapado' o 'at' mas fiz por cunho educacional
    const dateFormatted = format(appointmentHour, "dd/MM/yyyy 'at' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `New appointment for day ${dateFormatted})}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
