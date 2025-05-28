import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from 'src/common/constants';
import { UserNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
  ) {}

  // POST /users
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  // GET /users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // GET /users/:id
  async findOne(userID: string): Promise<User> {
    return await this.userRepository.findOneBy({ userID });
  }

  // PATCH /users/:id
  async update(userID: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(userID);
    if (!user) {
      throw new UserNotFoundException();
    }
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  // DELETE /users/:id
  async remove(userID: string): Promise<void> {
    const result = await this.userRepository.delete(userID);
    if (result.affected === 0) {
      throw new UserNotFoundException();
    }
  }

  // ***** OTHER METHODS *****

  // GET /users/displayName/:displayName
  async findByDisplayName(displayName: string): Promise<User> {
    return await this.userRepository.findOneBy({ displayName });
  }
}
