import { ResData } from "src/lib/resData";
import { StockEntity } from "../entities/stock.entity";
import { CreateStockDto } from "../dto/create-stock.dto";
import { UpdateStockDto } from "../dto/update-stock.dto";

export interface IStockService {
    findAll():Promise<ResData<StockEntity[]>>;
    findOne(id:number):Promise<ResData<StockEntity>>;
    create(stock: CreateStockDto):Promise<ResData<StockEntity>>;
    update(id:number, stock: UpdateStockDto):Promise<ResData<StockEntity>>;
    remove(entity:StockEntity):Promise<ResData<StockEntity>>;
}