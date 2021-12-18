import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';

import { ListUsertDto } from './dto/list-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GlobalResponseSwagger } from 'src/decorators/swagger.decorator';

@ApiTags('Users')
@Controller('users')
@GlobalResponseSwagger()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() listUseDto: ListUsertDto) {
    const users = await this.usersService.findAll(listUseDto);

    const modifyUsers = users.map(user => {
      delete user.password
      return user
    })

    return modifyUsers
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
