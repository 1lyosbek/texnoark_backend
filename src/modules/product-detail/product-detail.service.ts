import { Inject, Injectable } from '@nestjs/common';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { IProductDetailRepository } from './interfaces/repository-interface';
import { ResData } from 'src/lib/resData';
import { ProductDetailEntity } from './entities/product-detail.entity';
import { ProductsService } from '../products/products.service';
import { ProductDetailNotFound } from './exceptions/product-detail.exceptions';
import { IProductDetailService } from './interfaces/server-interface';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';

@Injectable()
export class ProductDetailService implements IProductDetailService {
  constructor(
    @Inject("IProductDetailRepository") private readonly productDetailRepository: IProductDetailRepository,
    @Inject("IProductService") private readonly productService: ProductsService
  ) {}
  async create(createProductDetailDto: CreateProductDetailDto):Promise<ResData<ProductDetailEntity>> {
    const {data: foundProduct } = await this.productService.findOne(createProductDetailDto.product_id);
    const colorsArray = createProductDetailDto.colors.split(',').map(color => color.trim());
    const newProductDetail = new ProductDetailEntity();
    newProductDetail.quantity = createProductDetailDto.quantity;
    newProductDetail.colors = colorsArray;
    newProductDetail.description = createProductDetailDto.description;
    newProductDetail.discount = createProductDetailDto.discount;
    newProductDetail.product_id = foundProduct.product.id;
    const created = await this.productDetailRepository.createProductDetail(newProductDetail);
    return new ResData<ProductDetailEntity>("Product detail created successfully", 201, created);
  }

  async findAll():Promise<ResData<ProductDetailEntity[]>> {
    const foundProductDetails = await this.productDetailRepository.getProductDetails();
    return new ResData<ProductDetailEntity[]>("All product details", 200, foundProductDetails);
  }

  async findOne(id: number):Promise<ResData<ProductDetailEntity>> {
    const foundProductDetail = await this.productDetailRepository.getProductDetail(id);
    if (!foundProductDetail) {
      throw new ProductDetailNotFound()
    }
    return new ResData<ProductDetailEntity>("Product detail found", 200, foundProductDetail);
  }

  async findByProductId(id: number): Promise<ResData<ProductDetailEntity | null>>{
    const foundProductDetail = await this.productDetailRepository.getByProductId(id);
    const resData = new ResData<ProductDetailEntity | null>("Product detail found by product id", 200, foundProductDetail);
    if (!foundProductDetail) {
      resData.message = "Product detail not found by product id";
      resData.statusCode = 404;
    }
    return resData;
  }

  async update(id: number, updateProductDetailDto: UpdateProductDetailDto):Promise<ResData<ProductDetailEntity>> {
    const { data: foundProduct } = await this.productService.findOne(updateProductDetailDto.product_id);
    const { data: foundProductDetail } = await this.findOne(id);
    foundProductDetail.quantity = updateProductDetailDto.quantity;
    foundProductDetail.description = updateProductDetailDto.description;
    foundProductDetail.discount = updateProductDetailDto.discount;
    foundProductDetail.colors = updateProductDetailDto.colors.split(',').map(color => color.trim());
    foundProductDetail.product_id = foundProduct.product.id;
    const updated = await this.productDetailRepository.updateProductDetail(foundProductDetail);
    return new ResData<ProductDetailEntity>("Product detail updated successfully", 200, updated);
  }

  async remove(entity: ProductDetailEntity):Promise<ResData<ProductDetailEntity>> {
    const deleted = await this.productDetailRepository.deleteProductDetail(entity);
    return new ResData<ProductDetailEntity>("Product detail deleted successfully", 200, deleted);
  }
}
