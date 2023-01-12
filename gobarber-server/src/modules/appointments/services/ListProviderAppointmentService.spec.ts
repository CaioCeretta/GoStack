import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

beforeEach(() => {
  fakeAppointmentsRepository = new FakeAppointmentsRepository();
  fakeCacheProvider = new FakeCacheProvider();

  listProviderAppointmentsService = new ListProviderAppointmentsService(
    fakeAppointmentsRepository,
    fakeCacheProvider,
  );
});

describe('ListProviderAppointments', () => {
  it('Should list the provider appointments on a specific date', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 4, 20, 12, 0, 0),
    });
    const appointment3 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 4, 20, 10, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      day: 20,
      month: 5,
      year: 2023,
    });

    expect(appointments).toEqual([appointment1, appointment2, appointment3]);
  });
});
