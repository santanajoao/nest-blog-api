import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prismaService: PrismaService) {}

  async findOne(userId: number, authorId: string) {
    return this.prismaService.follow.findUnique({
      where: {
        userId_authorId: {
          authorId: authorId,
          userId: userId,
        },
      },
    });
  }

  async follow(userId: number, authorId: string) {
    const follow = await this.findOne(userId, authorId);

    if (follow) {
      throw new ConflictException('You already follow this author');
    }

    return this.prismaService.follow.create({ data: { userId, authorId } });
  }

  async unfollow(userId: number, authorId: string) {
    const follow = await this.findOne(userId, authorId);

    if (!follow) {
      throw new ConflictException(
        "Can't unfollow. You don't follow this author",
      );
    }

    return this.prismaService.follow.delete({
      where: {
        userId_authorId: {
          authorId: authorId,
          userId: userId,
        },
      },
    });
  }
}
