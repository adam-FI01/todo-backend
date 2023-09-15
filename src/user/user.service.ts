// user.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto/login-user.dto';
import { Model } from 'mongoose';
import { User } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';

// Simulated user data store for demonstration purposes.
const users = [];

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(createUserDto: CreateUserDto) {
    const user = new CreateUserDto();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    // Validate the DTO
    const validationErrors = await validate(user);
    if (validationErrors.length > 0) {
      throw new BadRequestException(validationErrors);
    } else {
      const createdUser = new this.userModel(user);
      return await createdUser.save();
    }

    // Create and save the user
  }

  async login(loginUserDto: LoginUserDto) {
    // Simulate user login and authentication (replace with actual logic).
    const user = users.find((u) => u.email === loginUserDto.email);

    if (!user || user.password !== loginUserDto.password) {
      throw new Error('Authentication failed');
    }

    return user;
  }
}
