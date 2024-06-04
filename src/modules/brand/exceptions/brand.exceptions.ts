import { HttpException, HttpStatus } from "@nestjs/common";

export class BrandNotFound extends HttpException {
    constructor() {
        super('Brand not found', HttpStatus.NOT_FOUND);
    }
}