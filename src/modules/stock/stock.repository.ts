import { InjectRepository } from "@nestjs/typeorm";
import { IStockRepository } from "./interfaces/repository.interface";
import { StockEntity } from "./entities/stock.entity";
import { Repository } from "typeorm";

export class StockRepository implements IStockRepository{
    constructor(@InjectRepository(StockEntity) private repository: Repository<StockEntity>) {}
    async getStocks(): Promise<StockEntity[]> {
        return await this.repository.find({relations: ['category_id', 'brand_id', 'product_id']});
    }
    async getStock(id: number): Promise<StockEntity> {
        return await this.repository.findOne({where: {id: id}, relations: ['category_id', 'brand_id', 'product_id']});
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