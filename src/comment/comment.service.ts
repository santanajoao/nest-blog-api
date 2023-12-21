import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ content, postId, userId }: CreateCommentDto) {
    return this.prismaService.comment.create({
      data: { content: content, postId, userId },
    });
  }

  findOne(id: number) {
    return this.prismaService.comment.findUnique({ where: { id } });
  }

  findByPostId(postId: string) {
    return this.prismaService.comment.findMany({ where: { postId } });
  }

  async remove(id: number, userId: number) {
    const comment = await this.findOne(id);

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    if (comment.userId !== userId) {
      throw new UnauthorizedException(
        "You can't update a comment that isn't yours",
      );
    }

    return this.prismaService.comment.delete({ where: { id } });
  }
}
