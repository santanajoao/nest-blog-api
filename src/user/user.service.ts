import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userWithSameUsername = this.prismaService.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (userWithSameUsername) {
      throw new ConflictException(
        `The username ${createUserDto.username} is not available`,
      );
    }

    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prismaService.user.delete({ where: { id } });
  }
}
