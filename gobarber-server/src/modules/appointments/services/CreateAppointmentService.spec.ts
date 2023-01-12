import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

/* Cria como se fosse uma categoria, então nesse caso, todos os testes que estão nesse describe estão dentro da
funcionalidade de criar um appointment */
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 5, 12, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2023, 5, 12, 13),
      user_id: '1234567',
      provider_id: '1234654',
    });

    await expect(appointment).toHaveProperty('id');
    await expect(appointment.provider_id).toBe('1234654');
  });

  it('Should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2023, 20, 2, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '1234567',
      provider_id: '1234654',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '1234567',
        provider_id: '1234654',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 5, 12, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2023, 5, 12, 11),
        user_id: '123123',
        provider_id: '1231234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment with the user being the provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 5, 12, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2023, 5, 12, 11),
        user_id: 'user_id',
        provider_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment before 08AM and after 17PM', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 5, 12, 11).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2023, 5, 12, 7),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2023, 5, 12, 18),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
