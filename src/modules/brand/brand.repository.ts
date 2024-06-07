import { InjectRepository } from "@nestjs/typeorm";
import { IBrandEntityCount, IBrandRepository } from "./interfaces/repository-interface";
import { BrandEntity } from "./entities/brand.entity";
import { ILike, Repository } from "typeorm";

export class BrandRepository implements IBrandRepository {
    constructor(@InjectRepository(BrandEntity) private repository: Repository<BrandEntity>) { }
    async getBrands(word: string, limit: number, offset: number): Promise<IBrandEntityCount> {
        let whereCondition = {};

        if (word && word.trim() !== "") {
            whereCondition = { name: ILike(`%${word}%`) };
            const foundBrands = await this.repository.find({ where: whereCondition, skip: offset, take: limit, relations: ["category_id"] });
            const count = foundBrands.length;
            return { brands: foundBrands, count };
        } else {
            const count = await this.repository.createQueryBuilder('brands')
            .select('COUNT(*) count')
            .getRawOne();
            const foundBrands = await this.repository.find({skip: offset, take: limit});
            return { brands: foundBrands, count: parseInt(count.count, 10)};
        }
    }
    async getBrand(id: number): Promise<BrandEntity> {
        return await this.repository.findOne({ where: { id }});
    }
    async getByCategotyId(categoryId: number, limit: number, offset: number): Promise<IBrandEntityCount> {
        const f = await this.repository.find({ where: { category_id: categoryId } });
        const foundBrands = await this.repository.find({ where: {category_id: categoryId}, skip: offset, take: limit });
        const count = f.length;
        return { brands: foundBrands, count };
    }
    async getBrandByName(name: string): Promise<BrandEntity> {
        return await this.repository.findOneBy({ name });
    }
    async createBrand(brand: BrandEntity): Promise<BrandEntity> {
        return await this.repository.save(brand);
    }
    async updateBrand(brand: BrandEntity): Promise<BrandEntity> {
        return await this.repository.save(brand);
    }
    async deleteBrand(entity: BrandEntity): Promise<BrandEntity> {
        return await this.repository.remove(entity);
    }
}