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
import { LikeService } from 'src/like/like.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { CommentService } from 'src/comment/comment.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly likeService: LikeService,
    private readonly commentService: CommentService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @User('id') userId: number) {
    createPostDto.userId = userId;
    return this.postService.create(createPostDto);
  }

  @UseGuards(JwtGuard)
  @Post(':id/likes')
  async like(@Param('id') id: string, @User('id') userId: string) {
    await this.likeService.like(+userId, id);
    return { message: `Liked post with id ${id}` };
  }

  @UseGuards(JwtGuard)
  @Delete(':id/likes')
  async deslike(@Param('id') id: string, @User('id') userId: string) {
    await this.likeService.deslike(+userId, id);
    return { message: `Desliked post with id ${id}` };
  }

  @Get('search')
  search(
    @Query('q') query: string,
    @Query(
      'tags',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    tags: string[],
  ) {
    return this.postService.search(query, tags);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Get('author/:id')
  findAuthorPosts(@Param('id') authorId: string) {
    return this.postService.findAllByAuthor(authorId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @User('id') userId: number) {
    const post = await this.postService.remove(id, userId);
    return { message: `Your post ${post.title} was successfuly deleted` };
  }

  @Get(':id/comments')
  getPostComents(@Param('id') postId: string) {
    return this.commentService.findByPostId(postId);
  }

  @UseGuards(JwtGuard)
  @Post(':id/comments')
  createComment(
    @Param('id') postId: string,
    @Body() createPostCommentDto: CreatePostCommentDto,
    @User('id') userId: number,
  ) {
    return this.commentService.create({
      postId,
      userId,
      ...createPostCommentDto,
    });
  }

  @UseGuards(JwtGuard)
  @Delete(':id/comments/:commentId')
  async deleteComment(
    @Param('commentId') commentId: string,
    @User('id') userId: number,
  ) {
    await this.commentService.remove(+commentId, userId);
    return { message: 'Comment deleted' };
  }
}
