// exercise.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Exercise extends Document {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ type: [Date], default: [] }) // Set default value as an empty array for 'date'
  date: Date[];

  // Add other exercise properties, if any
}

export type ExerciseDocument = Exercise & Document;

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
