import { HttpStatus } from "@nestjs/common";

export interface ErrorItem {
    field?: string,
    message: string
}

export default interface ErrorResponse {
    statusCode: HttpStatus,
    timestamp: string
    path: string,
    errors: ErrorItem[]
}