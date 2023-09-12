// user.service.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto/login-user.dto';

// Simulated user data store for demonstration purposes.
const users = [];

@Injectable()
export class UserService {
  async register(createUserDto: CreateUserDto) {
    // Simulate user creation (you should replace this with actual database interaction).
    const newUser = {
      id: users.length + 1,
      ...createUserDto,
    };
    users.push(newUser);
    return newUser;
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
