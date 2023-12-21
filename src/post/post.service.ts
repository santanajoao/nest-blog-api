import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorService } from 'src/author/author.service';

@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
    private authorService: AuthorService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    return this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        tags: {
          connectOrCreate: createPostDto.tags.map((title) => ({
            where: { title },
            create: { title },
          })),
        },
        author: { connect: { userId: createPostDto.userId } },
      },
    });
  }

  async findOne(id: string) {
    const post = await this.prismaService.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  async findAllByAuthor(authorId: string) {
    return this.prismaService.post.findMany({ where: { authorId } });
  }

  async search(query: string, tags: string[] = []) {
    return this.prismaService.post.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { content: { contains: query } },
          { tags: { some: { title: { contains: query } } } },
          { author: { name: { contains: query } } },
        ],
        AND: tags.map((title) => ({ tags: { some: { title } } })),
      },
    });
  }

  async remove(id: string, userId: number) {
    const post = await this.prismaService.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    const author = await this.authorService.findOneByUserId(userId);
    if (post.authorId !== author.id) {
      throw new UnauthorizedException(
        "You can't delete a post that isn't yours",
      );
    }

    return this.prismaService.post.delete({ where: { id } });
  }
}
