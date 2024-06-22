// exercise.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
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
  name: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Set' }])
  sets: any[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: any;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
