// user.service.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto/login-user.dto';
import { Model } from 'mongoose';
import { User } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';

// Simulated user data store for demonstration purposes.
const users = [];

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async register(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
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
