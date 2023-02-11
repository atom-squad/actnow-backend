import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop([String])
  efforts: [string];
}
