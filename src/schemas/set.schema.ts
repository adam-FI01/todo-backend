// set.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Set extends Document {
  @Prop({ required: true })
  @IsNumber()
  @IsNotEmpty()
  reps: number;

  @Prop({ required: true })
  @IsNumber()
  @IsNotEmpty()
  weight: number;
}

export const SetSchema = SchemaFactory.createForClass(Set);
