import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

const axiosRequest = async (idUser: number, typeAction: string) => {
  try {
    await axios.post('http://localhost:4000/history-of-actions', {
      params: {
        idUser,
        typeAction,
      },
    });
  } catch (error) {
    throw new BadRequestException(error);
  }
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        name: createUserDto.name,
      },
    });
    if (existUser) throw new BadRequestException('This user already exist');

    const user = await this.userRepository.save({
      name: createUserDto.name,
      email: createUserDto.email,
    });

    axiosRequest(user.id, 'create');

    return { user };
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    axiosRequest(user.id, 'update');

    return await this.userRepository.update(id, updateUserDto);
  }
}
