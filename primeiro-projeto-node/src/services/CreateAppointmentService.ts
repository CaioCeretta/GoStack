import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
/**
 * [X] Recebimento das informações
 * [/]Tratativa de erros e exceções
 * [/]Acesso ao repositório
 */

interface IRequestDTO {
  date: Date;
  provider: string;
}

/**
 * Dependency Inversion
 * - Sempre que ele tiver uma dependencia externa, como por exemplo, o appointmentrepository, ao invés de instanciarmos
 * esta classe, nós iremos recebe-lo como um parametro do nosso constructor do serviço, desta maneira, independentemente
 * de quantos serviços estejam trabalhando com a parte de appointment, todas estarão usando o mesmo repositorio
 * de appointments
 */

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentRepository;
  }

  public execute({ date, provider }: IRequestDTO): Appointment {
    const appointmentHour = startOfHour(date);

    const findAppointmentInSameDate =
      this.appointmentsRepository.findByDate(appointmentHour);

    if (findAppointmentInSameDate) {
      throw Error('This hour is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentHour,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
