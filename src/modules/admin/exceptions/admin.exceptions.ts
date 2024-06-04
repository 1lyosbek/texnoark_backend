import { HttpException, HttpStatus } from "@nestjs/common";

export class AdminNotFound extends HttpException {
    constructor() {
        super('Admin not found', HttpStatus.NOT_FOUND);
    }
}