import { InjectRepository } from "@nestjs/typeorm";
import { IStockRepository } from "./interfaces/repository.interface";
import { StockEntity } from "./entities/stock.entity";
import { ILike, Repository } from "typeorm";
import { IStockEntityCount } from "./interfaces/service.interface";

export class StockRepository implements IStockRepository{
    constructor(@InjectRepository(StockEntity) private repository: Repository<StockEntity>) {}
    async getStocks(limit: number, offset: number): Promise<IStockEntityCount> {
            const foundStocks = await this.repository.find({ skip: offset, take: limit });
            const count = await this.repository.createQueryBuilder('prducts')
                .select('COUNT(*) count')
                .getRawOne();
            return { stocks: foundStocks, count: parseInt(count.count, 10) };
    }
    async getStock(id: number): Promise<StockEntity> {
        return await this.repository.findOne({where: {id: id}, relations: ['category_id', 'product_id']});
    }
    async getByBrandId(brandId: number): Promise<StockEntity[]> {
        console.log(brandId);
        return await this.repository.find({where: {brand_id: brandId}, relations: ['category_id', 'product_id']});
    }
    async createStock(entity: StockEntity): Promise<StockEntity> {
        return await this.repository.save(entity);
    }
    async updateStock(entity: StockEntity): Promise<StockEntity> {
        return await this.repository.save(entity);
    }
    async deleteStock(entity: StockEntity): Promise<StockEntity> {
        return await this.repository.remove(entity);
    }
}