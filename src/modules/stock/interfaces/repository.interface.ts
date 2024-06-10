import { StockEntity } from "../entities/stock.entity";
import { IStockEntityCount } from "./service.interface";

export interface IStockRepository {
    getStocks(limit: number, offset: number): Promise<IStockEntityCount>;
    getStock(id: number): Promise<StockEntity>;
    getByBrandId(brandId: number): Promise<StockEntity[]>;
    createStock(entity: StockEntity): Promise<StockEntity>;
    updateStock(entity: StockEntity): Promise<StockEntity>;
    deleteStock(entity: StockEntity): Promise<StockEntity>;
}