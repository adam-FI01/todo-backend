import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose'; // Import SchemaTypes

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Exercise' }]) // Use SchemaTypes
  exercises: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
