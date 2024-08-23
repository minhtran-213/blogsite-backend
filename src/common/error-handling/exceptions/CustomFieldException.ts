import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomFieldException extends HttpException {
    constructor (message: string, field: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
        super({message, field}, statusCode)
    }
}