import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  department: number;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop(
    raw({
      type: Map,
      of: Number,
    }),
  )
  pointsHistory: Map<string, number>;

  @Prop([
    raw({
      actionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Action' },
      txDate: { type: Date },
    }),
  ])
  actionsDone: Record<string, any>[];

  @Prop([
    raw({
      scanValue: { type: Number },
      scanObject: { type: String },
      txDate: { type: Date },
    }),
  ])
  scansHistory: Record<string, any>[];
}

export const UserSchema = SchemaFactory.createForClass(User);
