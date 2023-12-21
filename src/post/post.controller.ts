import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { User } from 'src/users/user.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @User('id') userId: number) {
    createPostDto.userId = userId;
    return this.postService.create(createPostDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Get('search')
  search(
    @Query('q') query: string,
    @Query('tags', new ParseArrayPipe({ items: String, separator: ',' }))
    tags: string[],
  ) {
    return this.postService.search(query, tags);
  }

  @Get('author/:id')
  findAuthorPosts(@Param() authorId: string) {
    return this.postService.findAllByAuthor(authorId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User('id') userId: number) {
    return this.postService.remove(id, userId);
  }
}
