import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductNotFound extends HttpException{
    constructor() {
        super('Product not found', HttpStatus.NOT_FOUND);
    }
}