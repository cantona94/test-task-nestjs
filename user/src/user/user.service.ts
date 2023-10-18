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
import { postData } from 'src/types';

const axiosRequest = async (idUser: number, typeAction: string) => {
  try {
    await axios.post<postData>('http://localhost:4000/history-of-actions', {
      params: {
        idUser,
        typeAction,
      },
    });
  } catch {
    throw new BadRequestException("server 'history' is unavailable");
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

    await axiosRequest(user.id, 'create');

    return { user };
  }

  async findAll(page: number, limit: number) {
    const users = await this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });

    if (Object.keys(users).length === 0) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    const existName = await this.userRepository.findOne({
      where: {
        name: updateUserDto.name,
      },
    });

    if (existName) throw new BadRequestException('This name is already taken');

    await axiosRequest(user.id, 'update');

    return await this.userRepository.update(id, updateUserDto);
  }
}
