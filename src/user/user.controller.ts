// user.controller.ts

import { Controller, Post, Body, UsePipes, ValidationPipe, HttpStatus, HttpException, Patch, Delete, Param, Get, Query, NotFoundException, Req, UnauthorizedException } from "@nestjs/common";
import { UserService } from './user.service';
import { validate } from "class-validator";
import { LoginUserDto } from "src/users/dto/login-user.dto/login-user.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto/create-user.dto";
import { AddExerciseDto, DeleteExerciseDto } from "src/users/dto/exercises.dto";
import { LoginUsernameDto } from "src/login-username.dto/login-username.dto";
import { Request } from "express";
import { HttpService } from "@nestjs/axios";
// ... (existing code)

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly httpService: HttpService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  /* @Post(':id/add-exercise')
  async addExercise(
    @Param('id') id: string,
    @Body() addExerciseDto: AddExerciseDto,
  ) {
    return this.userService.addExercise(, addExerciseDto);
  } */

@Post('/add-exercise')
async addExercise(
  @Req() req: Request,
) {
  try {
    const addExerciseDto: any = req.body as AddExerciseDto;

    // Extract the JWT token from the request headers
    const token = req?.cookies['jwtToken'];
    if (!token) {
      throw new UnauthorizedException('JWT token not found in headers');
    }

    // Decode the JWT token to get the username
    const decodedToken: any = this.userService.decodeJwtToken(token);
    const username = decodedToken;
    if (!username) {
      throw new UnauthorizedException('Username not found in JWT token');
    }

    // Use the username to fetch the corresponding user ID
    /* const userId = await this.userService.getUsernameById(username);
    if (!userId) {
      throw new UnauthorizedException('User ID not found');
    } */

    // Add the exercise using the fetched user ID
    return this.userService.addExercise(decodedToken, addExerciseDto);
  } catch (error) {
    console.error('Error adding exercise:', error);
    throw error;
  }
}

  /* @Delete(':id/exercises/:exerciseId')
  async deleteExercise(@Param('id') id: string, @Param('exerciseId') exerciseId: string) {
    // Ensure you are passing an instance of DeleteExerciseDto
    const deleteExerciseDto: DeleteExerciseDto = { exerciseId };
    return this.userService.deleteExercise(id, deleteExerciseDto);
  } */

  @Get('getUserByUsername')
  async getUsernameById(@Req() req: Request) {
    return this.userService.getUsernameById(req);
  }
}
