// exercise.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Exercise extends Document {
  @Prop()
  @IsString()
  name: string;

  // Add other exercise properties, if any
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
