// user.controller.ts

import { Controller, Post, Body, UsePipes, ValidationPipe, HttpStatus, HttpException, Patch, Delete, Param } from "@nestjs/common";
import { UserService } from './user.service';
import { validate } from "class-validator";
import { LoginUserDto } from "src/users/dto/login-user.dto/login-user.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto/create-user.dto";
import { AddExerciseDto, DeleteExerciseDto } from "src/users/dto/exercises.dto";

// ... (existing code)

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post(':id/exercises')
  async addExercise(
    @Param('id') id: string,
    @Body() addExerciseDto: AddExerciseDto,
  ) {
    return this.userService.addExercise(id, addExerciseDto);
  }

  @Delete(':id/exercises/:exerciseId')
  async deleteExercise(@Param('id') id: string, @Param('exerciseId') exerciseId: string) {
    // Ensure you are passing an instance of DeleteExerciseDto
    const deleteExerciseDto: DeleteExerciseDto = { exerciseId };
    return this.userService.deleteExercise(id, deleteExerciseDto);
  }
}
