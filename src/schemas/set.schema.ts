// set.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Set extends Document {
  @Prop()
  reps: number;

  @Prop()
  weightLifted: number;
}

export const SetSchema = SchemaFactory.createForClass(Set);
