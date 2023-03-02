import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization {
  @Prop({ auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop([
    raw({
      id: { type: Number },
      name: { type: String },
    }),
  ])
  departments: Record<string, any>[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
