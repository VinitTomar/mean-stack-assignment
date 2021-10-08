import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // private readonly users = [
  //   {
  //     id: '1',
  //     username: 'john',
  //     password: 'papa',
  //   },
  //   {
  //     id: '2',
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  constructor(
    @InjectRepository(User) private _usersRepository: Repository<User>,
  ) { }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }

  async findOne(username: string) {
    return this._usersRepository.findOne({ username });
  }

  // async findById(id: string): Promise<User | undefined> {
  //   return this.users.find(user => user.id === id);
  // }

  async findById(id: number) {
    return this._usersRepository.findOne({ id });
  }
}