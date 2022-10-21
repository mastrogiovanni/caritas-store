import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderRequest, OrderRequestSchema } from './schemas/order.request.schema';
import { Order, OrderSchema } from './schemas/order.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Retailer, RetailerSchema } from './schemas/retailer.schema';
import { UserModule } from './user/user.module';

require('dotenv').config()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_URL'),
				dbName: configService.get<string>('DATABASE_NAME')
			}),
			inject: [ConfigService]
		}),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: OrderRequest.name, schema: OrderRequestSchema }]),
    MongooseModule.forFeature([{ name: Retailer.name, schema: RetailerSchema }]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
