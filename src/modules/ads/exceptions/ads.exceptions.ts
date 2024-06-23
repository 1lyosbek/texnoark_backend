import { HttpException, HttpStatus } from "@nestjs/common";

export class AdsNotFound extends HttpException {
    constructor() {
        super('Advertisement not found', HttpStatus.NOT_FOUND);
    }
}