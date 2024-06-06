import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductDetailNotFound extends HttpException {
    constructor() {
        super('Product detail not found', HttpStatus.NOT_FOUND);
    }
}