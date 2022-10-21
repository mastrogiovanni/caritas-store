import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Retailer' })
  retailer: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  unity: string;

  @Prop({ required: true, options: ["weekly", "monthly", "all"] })
  orderType: string;

  @Prop({ required: true })
  disabled: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);