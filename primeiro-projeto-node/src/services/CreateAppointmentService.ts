import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
/**
 * [X] Recebimento das informações
 * [/]Tratativa de erros e exceções
 * [/]Acesso ao repositório
 */

interface IRequestDTO {
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

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentHour = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentHour,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This hour is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentHour,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
