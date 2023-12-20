import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { AuthorService } from './author.service';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }
}
