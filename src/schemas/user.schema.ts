// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { IsAlphanumeric, IsString, Length } from 'class-validator';
import { ExerciseSchema } from './exercise.schema';


@Schema()
export class Exercise {
  @Prop()
  @IsString()
  name: string;

  // Add other exercise properties, if any
}

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  @IsString()
  @Length(6, 255)
  @IsAlphanumeric()
  password: string;

  @Prop({ type: [ExerciseSchema] })
  exercises: typeof ExerciseSchema[];
}

export const UserSchema = SchemaFactory.createForClass(User);


