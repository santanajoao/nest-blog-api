import { ConflictException, Injectable } from '@nestjs/common';
import { FollowDto } from './dto/follow-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prismaService: PrismaService) {}

  async findOne(followDto: FollowDto) {
    return this.prismaService.follow.findUnique({
      where: {
        userId_authorId: {
          authorId: followDto.authorId,
          userId: followDto.userId,
        },
      },
    });
  }

  async follow(followDto: FollowDto) {
    const follow = await this.findOne(followDto);

    if (follow) {
      throw new ConflictException('You already follow this author');
    }

    return this.prismaService.follow.create({
      data: followDto,
    });
  }

  async unfollow(followDto: FollowDto) {
    const follow = await this.findOne(followDto);

    if (!follow) {
      throw new ConflictException(
        "Can't unfollow. You don't follow this author",
      );
    }

    return this.prismaService.follow.delete({
      where: {
        userId_authorId: {
          authorId: followDto.authorId,
          userId: followDto.userId,
        },
      },
    });
  }
}
