// user.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto/login-user.dto';
import { Model } from 'mongoose';
import { Exercise, User } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AddExerciseDto, DeleteExerciseDto } from 'src/users/dto/exercises.dto';
import { Request } from 'express';


@Injectable()
export class UserService {

  decodedToken: any;
  /* decodeJwtToken(token: string): any {
    try {
      const decodedToken = this.jwtService.decode(token) as any;
      return decodedToken.username;
    } catch (error) {
      throw new UnauthorizedException('Invalid JWT token');
    }
  } */

  decodeJwtToken(token: string): any {
    try {
      this.decodedToken = this.jwtService.decode(token) as any;
      return this.decodedToken.username;
    } catch (error) {
      throw new UnauthorizedException('Invalid JWT token');
    }
  }

  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    const user = new CreateUserDto();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    const existingUser = await this.userModel.findOne({
      username: createUserDto.username,
    });

    if (existingUser) {
      throw new BadRequestException('Username is already taken');
  }

    // Validate the DTO
    const validationErrors = await validate(user);
    if (validationErrors.length > 0) {
      throw new BadRequestException(validationErrors);
    } else {
      const createdUser = new this.userModel(user);
      // eslint-disable-next-line prettier/prettier
      const hashedPassword = await this.hashPassword(createUserDto.password);
      createUserDto.password = hashedPassword;
      return await createdUser.save();
    }

    // Create and save the user
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ username: loginUserDto.username });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = user.password === loginUserDto.password;
    console.log(isPasswordValid)

    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // If authentication is successful, generate and return a JWT token
    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    
    return { access_token: accessToken, user};

  }

  async addExercise(addExerciseDto: AddExerciseDto, username: string): Promise<any> {
    console.log(this.decodedToken.username)
    try {
      const exerciseName = addExerciseDto.exerciseName;
      console.log(addExerciseDto.exerciseName)
      const updateOperation = {
        $addToSet: {
          exercises: { name: exerciseName, date: [] },
        },
      };
  
      // Find user by username and update exercises
      const result = await this.userModel.findOneAndUpdate(
        { username: this.decodedToken.username, 'exercises': { $ne: exerciseName } },
        updateOperation,
        { new: true }
      );
  
      if (!result) {
        console.log(result);
        throw new NotFoundException('Failed to add exercise');
      }
  
      console.log('Exercise added successfully:', result);
      return result;
    } catch (error) {
      console.error('Error adding exercise:', error);
      throw error;
    }
  }


 /* async deleteExercise(userId: string, deleteExerciseDto: DeleteExerciseDto): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const exerciseIndex = user.exercises.findIndex(
      (exercise) => exercise['_id'].toString() === deleteExerciseDto.exerciseId
    );

    if (exerciseIndex === -1) {
      throw new NotFoundException('Exercise not found');
    }

    user.exercises.splice(exerciseIndex, 1);
    return user.save();
  } */

  async hashPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    return hashedPassword;
  }

  async getUsernameById(req: Request): Promise<any> {
    const token = req?.cookies['jwtToken']; // Assuming the JWT token is stored in a cookie named 'jwtToken'
    if (!token) {
      throw new UnauthorizedException('JWT token not found in cookies');
    }

    try {
      const decodedToken = this.jwtService.decode(token) as any;
      return decodedToken.username;
    } catch (error) {
      throw new UnauthorizedException('Invalid JWT token');
    }
  }
}
