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

  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly jwtService: JwtService, @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>) {}

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
    try {
      const exerciseName = addExerciseDto.exerciseName; // Extract exercise name from DTO
      console.log(exerciseName); // Check if exercise name is correctly extracted
  
      // Define the update operation to add the exercise
      const updateOperation = {
        $addToSet: {
          exercises: { name: exerciseName, date: [] },
        },
      };
  
      // Find user by username and update exercises if the exercise name doesn't already exist
      const result = await this.userModel.findOneAndUpdate(
        { username, 'exercises.name': { $ne: exerciseName } }, // Check if the exercise name doesn't already exist
        updateOperation,
        { new: true }
      );
  
      // If result is null, throw NotFoundException
      if (!result) {
        throw new NotFoundException('Failed to add exercise');
      }
  
      // Log success message and return the updated user document
      console.log('Exercise added successfully:', result);
      return result;
    } catch (error) {
      // Log and rethrow any errors that occur
      console.error('Error adding exercise:', error);
      throw error;
    }
  }
  


  async deleteExercises(deleteExerciseDto: DeleteExerciseDto, username: string): Promise<any> {
    try {
      const exerciseNameToDelete = deleteExerciseDto.exerciseName; // Extract exercise name from DTO
      console.log(exerciseNameToDelete); // Check if exercise name is correctly extracted

      // Define the delete operation to remove the exercise
      const deleteOperation = {
        $pull: {
          exercises: { name: exerciseNameToDelete },
        },
      };

      // Find user by username and delete exercises matching the exercise name
      const result = await this.userModel.findOneAndUpdate(
        { username },
        deleteOperation,
        { new: true }
      );

      // If result is null, throw NotFoundException
      if (!result) {
        throw new NotFoundException('Failed to delete exercises');
      }

      // Log success message and return the updated user document
      console.log('Exercises deleted successfully:', result);
      return result;
    } catch (error) {
      // Log and rethrow any errors that occur
      console.error('Error deleting exercises:', error);
      throw error;
    }
  }

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

  async getExercises(token: string): Promise<string[]> {
    try {
      // Decode the JWT token to get the username
      const decodedToken: any = this.jwtService.decode(token);
      if (!decodedToken) {
        throw new UnauthorizedException('Invalid JWT token');
      }
      const username = decodedToken.username;

      // Find the user by username
      const user = await this.userModel.findOne({ username }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Extract and return the names of exercises from the user's exercises array
      return user.exercises.map(exercise => exercise.name);
    } catch (error) {
      console.error('Error getting exercises:', error);
      throw error;
    }
  }
}
