"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let createAppointment;
let fakeNotificationsRepository;
let fakeCacheProvider;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '456456',
      provider_id: '123123132'
    });
    await expect(appointment).toHaveProperty('id');
    await expect(appointment.provider_id).toBe('123123132');
  });
  it("shouldn't be able to create a new appointment on the same time", async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '456456',
      provider_id: '123123132'
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '456456',
      provider_id: '123123132'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: '456456',
      provider_id: '123123132'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to create an appointment with the same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user_id',
      provider_id: 'user_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to create an appointment out of the available range schedule', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});