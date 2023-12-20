import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOneByUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const userWithSameUsername = await this.prismaService.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (userWithSameUsername) {
      throw new ConflictException(
        `The username ${createUserDto.username} is not available`,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        author: {
          create: { name: createUserDto.username },
        },
      },
    });
  }

  async findOneById(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOneById(id);

    const updateData = { ...updateUserDto };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    return this.prismaService.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    await this.findOneById(id);

    return this.prismaService.user.delete({ where: { id } });
  }
}
