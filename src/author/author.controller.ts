import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FollowService } from 'src/follow/follow.service';
import { User } from 'src/users/user.decorator';
import { JwtGuard } from 'src/jwt/jwt.guard';

@Controller('authors')
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService,
    private readonly followService: FollowService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOneById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @UseGuards(JwtGuard)
  @Post(':id/follow')
  async follow(@Param('id') authorId: string, @User('id') userId: number) {
    await this.followService.follow(userId, authorId);
    return { message: `Followed author with id ${authorId}` };
  }

  @UseGuards(JwtGuard)
  @Delete(':id/follow')
  async unfollow(@Param('id') authorId: string, @User('id') userId: number) {
    await this.followService.unfollow(userId, authorId);
    return { message: `Unfollowed author with id ${authorId}` };
  }
}
