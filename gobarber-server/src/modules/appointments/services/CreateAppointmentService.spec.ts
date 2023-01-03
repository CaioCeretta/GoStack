import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

/* Cria como se fosse uma categoria, então nesse caso, todos os testes que estão nesse describe estão dentro da
funcionalidade de criar um appointment */
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1234654',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234654');
  });

  it('Should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2022, 11, 30, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1234654',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1234654',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
