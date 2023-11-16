import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Exercise, ExerciseSchema, User, UserSchema } from '../schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
      { name: Exercise.name, schema: ExerciseSchema },]),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your secret key
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
