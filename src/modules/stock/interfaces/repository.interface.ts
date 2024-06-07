import { StockEntity } from "../entities/stock.entity";

export interface IStockRepository {
    getStocks(): Promise<StockEntity[]>;
    getStock(id: number): Promise<StockEntity>;
    createStock(entity: StockEntity): Promise<StockEntity>;
    updateStock(entity: StockEntity): Promise<StockEntity>;
    deleteStock(entity: StockEntity): Promise<StockEntity>;
}