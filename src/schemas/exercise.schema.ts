// exercise.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Exercise extends Document {
  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Set' }])
  sessions: Array<string>;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
