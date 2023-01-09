import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';

import ListProviderMonthAvailability from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailability;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

beforeEach(() => {
  fakeAppointmentsRepository = new FakeAppointmentsRepository();
  listProviderMonthAvailability = new ListProviderMonthAvailability(
    fakeAppointmentsRepository,
  );
});

describe('ListProviderMonthAvailability', () => {
  it('SHould be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 17, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '1234567',
      date: new Date(2023, 10, 10, 18, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'provider',
      year: 2023,
      month: 11,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 10, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
