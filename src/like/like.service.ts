import { ConflictException, Injectable } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postService: PostService,
  ) {}

  async findOne(userId: number, postId: string) {
    return this.prismaService.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });
  }

  async like(userId: number, postId: string) {
    await this.postService.findOne(postId);

    const like = this.findOne(userId, postId);

    if (like) {
      throw new ConflictException('You already liked this post');
    }

    return this.prismaService.like.create({ data: { userId, postId } });
  }

  async deslike(userId: number, postId: string) {
    await this.postService.findOne(postId);

    const like = this.findOne(userId, postId);

    if (!like) {
      throw new ConflictException(
        "Unable to deslike. You didn't like this post",
      );
    }

    return this.prismaService.like.delete({
      where: { userId_postId: { userId, postId } },
    });
  }
}
