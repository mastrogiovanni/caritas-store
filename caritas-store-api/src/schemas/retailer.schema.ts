import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RetailerDocument = Retailer & Document;

@Schema()
export class Retailer {

  @Prop({ required: true })
  name: string;

}

export const RetailerSchema = SchemaFactory.createForClass(Retailer);