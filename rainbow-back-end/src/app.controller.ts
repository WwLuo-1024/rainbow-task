import { Controller, Get, Post, Query, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { SuccessModel, ErrorModel } from './model/resModel';
import mockjs from 'mockjs';

const Random = mockjs.Random;

type ProductDataType = {
  productId: string;
  originalPrice: number;
  discount: number;
  isSale: boolean;
  isPublish: boolean;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('/api/product')
export class ProductController {
  @Get('/')
  productDetail(@Query() query: { id: number }) {
    // console.log(query.id);
    const productDetailList: ProductDataType = {
      productId: Random.id(),
      originalPrice: Random.natural(30, 100),
      discount: Random.natural(5, 10),
      isSale: false,
      isPublish: false,
    };
    return new SuccessModel(productDetailList);
  }

  @Post('/')
  productPublish(@Request() req) {
    console.log(req.body);
    return new SuccessModel(req.body);
  }
}
