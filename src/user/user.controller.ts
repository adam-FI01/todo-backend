// user.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

// Define the CreateUserDto class with properties for user registration.
class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

// Define the LoginUserDto class with properties for user login.
class LoginUserDto {
  readonly email: string;
  readonly password: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
