import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();

  listProviders = new ListProvidersService(fakeUsersRepository);
});

describe('ListProviderMonthAvailability', () => {
  it('Should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jorge',
      email: 'jorge@teste.com.br',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Kleber',
      email: 'kleber@teste.com.br',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Roberto',
      email: 'roberto@teste.com.br',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    /* Nesse caso devemos usar o toEqual, porque o toBe irá comparar não se uma variável é igual à outra no formato, e
    sim se é a mesma variável */
    expect(providers).toEqual([user1, user2]);
  });
});
