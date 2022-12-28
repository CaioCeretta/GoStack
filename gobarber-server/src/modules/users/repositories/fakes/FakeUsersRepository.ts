import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<any> {
    const foundUser = this.users.find(user => user.id);

    return foundUser;
  }

  public async findByEmail(email: string): Promise<any> {
    const foundUser = await this.users.find(user => user.email === email);

    return foundUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const foundIndex = this.users.findIndex(
      foundUser => foundUser.id === user.id,
    );

    this.users[foundIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;