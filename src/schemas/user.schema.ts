import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ required: true })
  department: number;

  @Prop(
    raw({
      email: { type: String },
      authToken: { type: String },
      userName: { type: String },
      password: { type: String },
    }),
  )
  credentials: Record<string, any>;

  @Prop([
    raw({
      key: { type: String },
      points: { type: Number },
    }),
  ])
  pointsHistory: Record<string, any>[];

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
