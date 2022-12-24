import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
/**
 * [X] Recebimento das informações
 * [/]Tratativa de erros e exceções
 * [/]Acesso ao repositório
 */

interface IRequest {
  date: Date;
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
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentHour = startOfHour(date);

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentHour);

    if (findAppointmentInSameDate) {
      throw new AppError('This hour is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentHour,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
