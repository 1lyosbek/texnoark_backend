import { InjectRepository } from "@nestjs/typeorm";
import { IProductEntityCount, IProductRepository } from "./interfaces/repository-interface";
import { ProductEntity } from "./entities/product.entity";
import { ILike, MoreThan, Repository } from "typeorm";

export class ProductRepository implements IProductRepository {
    constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) {}
    async getProducts(word: string, limit: number, offset: number): Promise<IProductEntityCount> {
        let whereCondition = {};
        if (word && word.trim()!== "") {
            whereCondition = { name: ILike(`%${word}%`) };
            const foundProducts = await this.repository.find({ where: whereCondition, skip: offset, take: limit });
            const count = foundProducts.length;
            return { products: foundProducts, count };
        } else {
            const foundProducts = await this.repository.find({ where: whereCondition, skip: offset, take: limit });
            const count = await this.repository.createQueryBuilder('prducts')
                .select('COUNT(*) count')
                .getRawOne();
            return {products: foundProducts, count: parseInt(count.count, 10)};
        }
    }

    async getPopular(limit: number, offset: number): Promise<IProductEntityCount> {
        const foundProducts = await this.repository.find({where: {rate: MoreThan(3)}, skip: offset, take: limit});
        const count = await this.repository.createQueryBuilder('prducts')
        .select('COUNT(*) count')
        .where({rate: MoreThan(3)})
        .getRawOne();
        return {products: foundProducts, count: parseInt(count.count, 10)};
    }
    async getByBrandId(brandId: number): Promise<ProductEntity[]> {
        return await this.repository.find({where: {brand_id: brandId}, relations: ['category_id', 'brand_category_id']});
    }
    async getProduct(id: number): Promise<ProductEntity> {
        return await this.repository.findOneBy({id});
    }
    async createProduct(product: ProductEntity): Promise<ProductEntity> {
        return await this.repository.save(product);
    }
    async updateProduct(product: ProductEntity): Promise<ProductEntity> {
        return await this.repository.save(product);
    }
    async deleteProduct(product: ProductEntity): Promise<ProductEntity> {
        return await this.repository.remove(product);
    }  
}