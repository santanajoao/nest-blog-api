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
  Patch,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { User } from 'src/users/user.decorator';
import { LikeService } from 'src/like/like.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { CommentService } from 'src/comment/comment.service';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';

@Controller('post')
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
  like(@Param('id') id: string, @User('id') userId: string) {
    return this.likeService.like(+userId, id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id/likes')
  deslike(@Param('id') id: string, @User('id') userId: string) {
    return this.likeService.deslike(+userId, id);
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
  @Patch(':id/comments/:commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdatePostCommentDto,
    @User('id') userId: number,
  ) {
    return this.commentService.update(+commentId, {
      ...updateCommentDto,
      userId,
    });
  }

  @UseGuards(JwtGuard)
  @Delete(':id/comments/:commentId')
  deleteComment(
    @Param('commentId') commentId: string,
    @User('id') userId: number,
  ) {
    return this.commentService.remove(+commentId, userId);
  }
}
