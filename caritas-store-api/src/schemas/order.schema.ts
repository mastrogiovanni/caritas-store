import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from './product.schema';
import { OrderRequest } from './order.request.schema';
import { Retailer } from './retailer.schema';
import { User } from 'src/user/schemas/user.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product: Product;

    // This is from product
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Retailer' })
    retailer: Retailer;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OrderReequest' })
    order: OrderRequest;

    @Prop({ required: true })
    quantity: number;

    // Fields copied from product

    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true })
    description: string;
  
    @Prop({ required: true })
    category: string;
  
    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    unity: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);