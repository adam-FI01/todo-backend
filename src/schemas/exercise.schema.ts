// exercise.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsString, IsNotEmpty, ArrayMinSize, isNotEmpty } from 'class-validator';

@Schema()
export class Set {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  reps: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsString()
  @IsNotEmpty()
  intensity: string;

  @IsNotEmpty()
  _id: any;
}

export const SetSchema = SchemaFactory.createForClass(Set);

@Schema()
export class Exercise extends Document {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

 @Prop({ type: [SetSchema], default: [] })
  @ArrayMinSize(1)
  sets: Set[]; // Array of Set objects
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
