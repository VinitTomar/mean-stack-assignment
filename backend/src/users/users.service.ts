import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private _usersRepository: Repository<User>,
  ) { }

  async findOne(username: string) {
    return this._usersRepository.findOne({ username });
  }

  async findById(id: number) {
    return this._usersRepository.findOne({ id });
  }
}