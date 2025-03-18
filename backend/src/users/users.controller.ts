import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: { name: string; email: string }) {
    return this.usersService.createUser(createUserDto.name, createUserDto.email);
  }

  @Get()
  async findAll() {
    return this.usersService.getAllUsers();
  }
}
