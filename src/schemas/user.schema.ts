import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { IsString, IsArray, ArrayMinSize, ValidateNested, IsNotEmpty } from 'class-validator';

@Schema()
export class Set {
  @Prop()
  weight: number;

  @Prop()
  reps: number;

  @Prop()
  intensity: string;

  @Prop({ type: Types.ObjectId, default: new Types.ObjectId() }) // Ensure each set has a unique ObjectId
  _id: Types.ObjectId;
}

@Schema()
export class Exercise {
  @Prop()
  @IsString()
  name: string;

  @Prop({ type: [Set] }) // Define the type as an array of the custom schema "Set"
  @IsArray()
  @ArrayMinSize(1) // Ensure the array has at least one element
  @ValidateNested({ each: true }) // Validate each element of the array using the Set schema
  sets: Set[];
}

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  @IsString()
  password: string;

  @Prop({ type: [Object], default: [] })
  exercises: Exercise[];
}

export const UserSchema = SchemaFactory.createForClass(User);
