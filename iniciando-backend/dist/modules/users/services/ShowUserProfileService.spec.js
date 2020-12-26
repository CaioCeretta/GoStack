"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowUserProfileService = _interopRequireDefault(require("./ShowUserProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let showProfile;
describe('Show User profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showProfile = new _ShowUserProfileService.default(fakeUsersRepository);
  });
  it('Should be able to show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });
  it('Should not be able to show the user profile from non-existing user', async () => {
    expect(showProfile.execute({
      user_id: 'non existing user'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});