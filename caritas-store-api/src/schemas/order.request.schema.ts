import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderRequestDocument = OrderRequest & Document;

@Schema()
export class OrderRequest {

  @Prop({ type: Date, required: true })
  from: Date;

  @Prop({ type: Date, required: true })
  to: Date;

  @Prop({ required: true })
  notes: string;

  @Prop({ required: true, options: ["weekly", "monthly"] })
  type: string;

}

export const OrderRequestSchema = SchemaFactory.createForClass(OrderRequest);