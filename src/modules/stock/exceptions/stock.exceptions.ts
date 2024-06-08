import { HttpException, HttpStatus } from "@nestjs/common";

export class StockNotFound extends HttpException {
    constructor() {
        super('Stock not found', HttpStatus.NOT_FOUND);
    }
}