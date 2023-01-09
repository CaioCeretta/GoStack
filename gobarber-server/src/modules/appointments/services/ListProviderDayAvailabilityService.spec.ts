import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderDayAvailability from './ListProviderDayAvailabilityService';

let listProviderDayAvailability: ListProviderDayAvailability;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

beforeEach(() => {
  fakeAppointmentsRepository = new FakeAppointmentsRepository();
  listProviderDayAvailability = new ListProviderDayAvailability(
    fakeAppointmentsRepository,
  );
});

describe('ListProviderDayAvailability', () => {
  it('Should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'provider',
      year: 2023,
      month: 11,
      day: 10,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 10, available: false },
        { hour: 17, available: true },
        { hour: 16, available: true },
      ]),
    );
  });
});
