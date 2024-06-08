import { InjectRepository } from "@nestjs/typeorm";
import { IProductDetailRepository } from "./interfaces/repository-interface";
import { ProductDetailEntity } from "./entities/product-detail.entity";
import { Repository } from "typeorm";

export class ProductDetailRepository implements IProductDetailRepository {
    constructor(@InjectRepository(ProductDetailEntity) private repository: Repository<ProductDetailEntity>) {}
    async createProductDetail(productDetail: ProductDetailEntity): Promise<ProductDetailEntity> {
        return await this.repository.save(productDetail);
    }
    async getProductDetails(): Promise<ProductDetailEntity[]> {
        return await this.repository.find();
    }
    async getByProductId(id: number): Promise<ProductDetailEntity> {
        return await this.repository.findOne({where: {product_id: id}});
    }
    async getProductDetail(id: number): Promise<ProductDetailEntity> {
        return await this.repository.findOne({where: {id}});
    }
    async updateProductDetail(productDetail: ProductDetailEntity): Promise<ProductDetailEntity> {
        return await this.repository.save(productDetail);
    }
    async deleteProductDetail(productDetail: ProductDetailEntity): Promise<ProductDetailEntity> { 
        return await this.repository.remove(productDetail);
    }
}