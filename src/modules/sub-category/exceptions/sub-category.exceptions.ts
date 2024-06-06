import { HttpException, HttpStatus } from "@nestjs/common";

export class SubCategoryNotFound extends HttpException{
    constructor() {
        super('Sub Category not found', HttpStatus.NOT_FOUND);
    }
}

export class ParentCategoryIdLengthNotFound extends HttpException{
    constructor() {
        super('No sub-category found for this category', HttpStatus.NOT_FOUND);
    }
}