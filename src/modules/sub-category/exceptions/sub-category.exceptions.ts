import { HttpException, HttpStatus } from "@nestjs/common";

export class SubCategoryNotFound extends HttpException{
    constructor() {
        super('Sub Category not found', HttpStatus.NOT_FOUND);
    }
}

export class SubCategoryAlreadyExist extends HttpException{
    constructor() {
        super('This sub categorty already exist', HttpStatus.BAD_REQUEST);
    }
}