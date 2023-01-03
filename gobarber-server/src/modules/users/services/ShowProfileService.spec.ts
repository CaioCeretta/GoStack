import AppError from '@shared/errors/AppError';
import usersRouter from '../infra/http/routes/users.routes';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();

  showProfile = new ShowProfileService(fakeUsersRepository);
});

describe('UpdateUserProfile', () => {
  it('Should be able to show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jorge',
      email: 'jorge@teste.com.br',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jorge');
    expect(profile.email).toBe('jorge@teste.com.br');
  });

  it('Should not be able to show the user profile of a non existent user', async () => {
    expect(
      showProfile.execute({ user_id: 'non-existent-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
