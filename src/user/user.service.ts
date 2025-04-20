import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: { id: string; email: string; username: string }) {
    try {
      const user = this.userRepository.create(data);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating user: ' + error.message,
      );
    }
  }
  
  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error finding user by email: ' + error.message,
      );
    }
  }
}