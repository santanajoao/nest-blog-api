import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prismaService: PrismaService) {}

  async findOneById(id: string) {
    const author = await this.prismaService.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    return author;
  }

  async findOneByUserId(userId: number) {
    return this.prismaService.author.findUnique({ where: { userId } });
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    await this.findOneById(id);

    return this.prismaService.author.update({
      where: { id },
      data: updateAuthorDto,
    });
  }
}
