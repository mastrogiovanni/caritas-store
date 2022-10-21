import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderRequestDto } from './dto/create.order.request.dto';
import { CreateProductDto } from './dto/create.product.dto';
import { CreateRetailerDto } from './dto/create.retailer';
import { UpsertOrderDto } from './dto/upsert.order.dto';

@Controller("/api")
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Post("/retailer")
  async createRetailer(@Body() createRetailer: CreateRetailerDto) {
    return await this.appService.createRetailer(createRetailer);
  }

  @Get("/retailer")
  async listRetailers() {
    return await this.appService.listRetailer();
  }

  @Get("/retailer/:id")
  async getRetailer(@Param("id") id: string) {
    return await this.appService.getRetailer(id);
  }

  @Delete("/product/:id")
  async deleteProduct(@Param("id") id: string) {
    return await this.appService.deleteProduct(id);
  }

  @Put("/product/:id/enabled/:enabled")
  async enableProduct(@Param("id") id: string, @Param("enabled") enabled: string) {
    return await this.appService.enableProduct(id, enabled);
  }

  @Post("/product")
  async createProduct(@Body() createProduct: CreateProductDto) {
    return await this.appService.createProduct(createProduct);
  }

  @Get("/product")
  async listProducts() {
    return await this.appService.listProducts();
  }

  @Post("/orderrequest")
  async createOrderRequest(@Body() createOrderRequest: CreateOrderRequestDto) {
    return await this.appService.createOrderRequest(createOrderRequest);
  }

  @Get("/orderrequest")
  async getCurrentOrderRequest() {
    return await this.appService.getCurrentOrderRequest();
  }

  @Get("/orderrequests")
  async getAllOrderRequest() {
    return await this.appService.getAllOrderRequest();
  }

  @Get("/orderrequest/:id")
  async getOrderRequest(@Param("id") id: string) {
    return await this.appService.getOrderRequest(id);
  }

  @Get("/orderrequest/user/:idUser")
  async listOrderRequest(@Param("idUser") idUser: string) {
    // return await this.appService.listOrderRequest(idUser);
  }

  @Put("/order")
  async upsertOrder(@Body() upsertOrder: UpsertOrderDto) {
    return await this.appService.upsertOrder(upsertOrder);
  }

  @Get("/order/user/:idUser/request/:idRequest")
  async getOrderPerUser(@Param("idUser") idUser: string, @Param("idRequest") idRequest: string) {
    return await this.appService.getOrderPerUser(idUser, idRequest);
  }

  @Get("/order/retailer/:idRetailer/request/:idRequest")
  async getOrderPerRetailer(@Param("idRetailer") idRetailer: string, @Param("idRequest") idRequest: string) {
    return await this.appService.getOrderPerRetailer(idRetailer, idRequest);
  }

  @Get("/health")
  health(): string {
    return this.appService.health();
  }
}
