import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);
    return new UserEntity(createdUser);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const foundUser = await this.userService.findOne(+id);
    return new UserEntity(foundUser);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(+id, updateUserDto);
    return new UserEntity(updatedUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.userService.remove(+id);
    return new UserEntity(deletedUser);
  }
}
