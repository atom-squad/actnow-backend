import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { propConfig } from 'native-base/lib/typescript/theme/styled-system';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ required: true })
  department: number;

  @Prop()
  email: string;

  @Prop()
  userName: string;

  @Prop()
  password: string

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
