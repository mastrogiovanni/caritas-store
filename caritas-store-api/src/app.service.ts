import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderRequestDto } from './dto/create.order.request.dto';
import { CreateProductDto } from './dto/create.product.dto';
import { CreateRetailerDto } from './dto/create.retailer';
import { UpsertOrderDto } from './dto/upsert.order.dto';
import { OrderRequest, OrderRequestDocument } from './schemas/order.request.schema';
import { Order, OrderDocument } from './schemas/order.schema';
import { Product, ProductDocument } from './schemas/product.schema';
import { Retailer, RetailerDocument } from './schemas/retailer.schema';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(OrderRequest.name) private orderRequestModel: Model<OrderRequestDocument>,
    @InjectModel(Retailer.name) private retailerModel: Model<RetailerDocument>
  ) { }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel({
      name: createProductDto.name,
      description: createProductDto.description,
      category: createProductDto.category,
      retailer: createProductDto.idRetailer,
      price: createProductDto.price,
      unity: createProductDto.unity,
      orderType: createProductDto.orderType
    });
    return product.save();
  }

  async listProducts() {
    return await this.productModel.find({}).exec();
  }

  async deleteProduct(id: string) {
    return await this.productModel.findByIdAndDelete(id).exec();
  }

  async enableProduct(id: string, enabled: string) {
    return await this.productModel.findByIdAndUpdate(id, {
      disabled: (enabled === "true" ? "false" : "true")
    }).exec();
  }

  async createRetailer(createRetailerDto: CreateRetailerDto) {
    const retailer = new this.retailerModel(createRetailerDto);
    return retailer.save();
  }

  async listRetailer() {
    return await this.retailerModel.find({}).exec();
  }

  async getRetailer(id: string) {
    return await this.retailerModel.findById(id).exec();
  }

  async createOrderRequest(createOrderRequestDto: CreateOrderRequestDto): Promise<OrderRequest> {
    const orderRequest = new this.orderRequestModel(createOrderRequestDto);
    return orderRequest.save();
  }

  async getCurrentOrderRequest() {
    const now = new Date(Date.now());
    return await this.orderRequestModel.find(
      { 
        from: { $lte: now },
        to: { $gte: now }
      }).exec();
  }

  async getAllOrderRequest() {
    const now = new Date(Date.now());
    return await this.orderRequestModel.find({}).sort({ from: 1 }).exec();
  }

  async getOrderRequest(id: string) {
    return await this.orderRequestModel.findById(id).exec();
  }

  async getOrderPerUser(idUser: string, idOrderRequest: string) {
    return await this.orderModel.find({
      user: idUser,
      order: idOrderRequest
    }).exec();
  }

  async getOrderPerRetailer(idRetailer: string, idOrderRequest: string) {
    return await this.orderModel.find({
      retailer: idRetailer,
      order: idOrderRequest
    }).exec();
  }

  async upsertOrder(upsertOrderDto: UpsertOrderDto): Promise<Order> {
    const product = await this.productModel.findById(upsertOrderDto.idProduct);
    if (upsertOrderDto.quantity && upsertOrderDto.quantity != 0) {
      return await this.orderModel.findOneAndUpdate({
        order: upsertOrderDto.idOrderRequest,
        user: upsertOrderDto.idUser,
        product: upsertOrderDto.idProduct,
        retailer: product.retailer,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        unity: product.unity
      }, {
        quantity: upsertOrderDto.quantity
      }, { 
        upsert: true, new: true 
      }).exec();
    }
    else {
      return await this.orderModel.findOneAndDelete({
        order: upsertOrderDto.idOrderRequest,
        user: upsertOrderDto.idUser,
        product: upsertOrderDto.idProduct,
        retailer: product.retailer,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        unity: product.unity
      }).exec();
    }
  }

  health(): string {
    return 'OK';
  }
}
