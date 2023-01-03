import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

beforeEach(() => {
  fakeHashProvider = new FakeHashProvider();
  fakeUsersRepository = new FakeUsersRepository();

  updateProfile = new UpdateProfileService(
    fakeUsersRepository,
    fakeHashProvider,
  );
});

describe('UpdateUserProfile', () => {
  it('Should be able to update a user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jorge',
      email: 'jorge@teste.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Luquinhas',
      email: 'Luquinhas@teste.com',
    });

    expect(updatedUser.name).toBe('Luquinhas');
    expect(updatedUser.email).toBe('Luquinhas@teste.com');
  });

  it('Should NOT be able to change the e-mail to another user e-mail', async () => {
    await fakeUsersRepository.create({
      name: 'Jorge',
      email: 'jorge@teste.com.br',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jorgino',
      email: 'jorge2@teste.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jorge',
        email: 'jorge@teste.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jorge',
      email: 'jorge@teste.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Luquinhas',
      email: 'Luquinhas@teste.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('Should NOT be able to update the password without passing the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jorge',
      email: 'jorge@teste.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Luquinhas',
        email: 'Luquinhas@teste.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should NOT be able to update the password when the old password does not match', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jorge',
      email: 'jorge@teste.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Luquinhas',
        email: 'Luquinhas@teste.com',
        old_password: '12345',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update a non existent user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existent-user-id',
        email: 'jorge@teste.com',
        name: 'Jorge',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
