import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      username: 'john',
      password: 'papa',
    },
    {
      id: '2',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
}