import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from './category.schema';

export type ActionDocument = HydratedDocument<Action>;

@Schema()
export class Action {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  actionCategory: Category;

  @Prop()
  actionType: string;

  @Prop()
  actionPoints: number;

  @Prop()
  actionDescription: string;
}

export const ActionSchema = SchemaFactory.createForClass(Action);