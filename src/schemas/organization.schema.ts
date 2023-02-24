import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization {
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
