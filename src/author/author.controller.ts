import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FollowService } from 'src/follow/follow.service';
import { User } from 'src/users/user.decorator';
import { JwtGuard } from 'src/jwt/jwt.guard';

@Controller('author')
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService,
    private readonly followService: FollowService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @UseGuards(JwtGuard)
  @Post(':id/follow')
  async follow(@Param('id') authorId: string, @User('id') userId: number) {
    await this.followService.follow({ authorId, userId });
    return 'Followed successfully';
  }

  @UseGuards(JwtGuard)
  @Post(':id/unfollow')
  async unfollow(@Param('id') authorId: string, @User('id') userId: number) {
    await this.followService.unfollow({ authorId, userId });
    return 'Successfully unfollowed';
  }
}
