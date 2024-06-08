import { HttpException, HttpStatus } from "@nestjs/common";

export class CategoryNotFound extends HttpException {
    constructor() {
        super("Category not found", HttpStatus.NOT_FOUND)
    }
}
export class CategoryAlreadyExist extends HttpException {
    constructor() {
        super("This category already exist", HttpStatus.BAD_REQUEST)
    }
}