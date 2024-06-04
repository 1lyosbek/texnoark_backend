import { HttpException, HttpStatus } from '@nestjs/common';

export class PhoneOrPasswordWrongException extends HttpException {
  constructor() {
    super('Admin Phone or Password Wrong!', HttpStatus.BAD_REQUEST);
  }
}
export class PhoneNumberAlreadyExist extends HttpException {
  constructor() {
    super('This phone already exist, Please enter other number!', HttpStatus.BAD_REQUEST);
  }
}
