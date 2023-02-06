import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from './category.schema';

export type ActionDocument = HydratedDocument<Action>;

@Schema()
export class Action {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop()
  type: string;

  @Prop()
  points: number;

  @Prop()
  description: string;
}
