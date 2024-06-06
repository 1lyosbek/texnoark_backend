import { HttpException, HttpStatus } from "@nestjs/common";

export class BrandNotFound extends HttpException {
    constructor() {
        super('Brand not found', HttpStatus.NOT_FOUND);
    }
}

export class ThisBrandAlreadyExist extends HttpException {
    constructor() {
        super('This brand name already exist', HttpStatus.BAD_REQUEST);
    }
}