import { HttpException, HttpStatus } from "@nestjs/common";

export class BrandCategoryNotFound extends HttpException{
    constructor() {
        super('Brand Category not found', HttpStatus.NOT_FOUND);
    }
}