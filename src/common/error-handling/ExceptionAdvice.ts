import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import ErrorResponse, { ErrorItem } from "../interface/ErrorResponse.interface";
import { Request, Response } from "express";

import { CustomFieldException } from "./exceptions/CustomFieldException";
import { ValidationError } from "class-validator";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        let status = HttpStatus.INTERNAL_SERVER_ERROR
        let errorResponse: ErrorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            errors: []
        }

        if (exception instanceof HttpException) {
            const status = exception.getStatus()
            const exceptionResponse = exception.getResponse()
            if (status === 500) {
                errorResponse.errors.push({
                    field: '',
                    message: exception.message
                })
                console.warn('Internal Server occurs: ', exception.stack)
                return response.status(status).json(errorResponse)
            } 

            if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
              errorResponse.statusCode = status
              if (Array.isArray(exceptionResponse.message) && typeof exceptionResponse.message[0] === 'object') {
                errorResponse.errors = this.formatValidationErrors(exceptionResponse.message)
              } else if (exception instanceof CustomFieldException) {
                errorResponse.errors.push({
                  field: (exceptionResponse as ErrorItem).field,
                  message: (exceptionResponse as ErrorItem).message
                })
              } else {
                const messages = Array.isArray(exceptionResponse.message) ? exceptionResponse.message : [exceptionResponse.message]
                errorResponse.errors = this.formatValidationErrors(messages)
              }
            } 
            return response.status(status).json(errorResponse)
        }
        errorResponse.errors.push({
          field: '',
          message: 'Unexpected Error'
        })
        console.warn('Internal Server occurs: ', exception.stack)
        return response.status(status).json(errorResponse)
    }

    private formatValidationErrors(validationErrors: ValidationError[]): ErrorItem[] {
      const formattedErrors: ErrorItem[] = [];
  
      const extractErrors = (error: ValidationError) => {
        if (error.children && error.children.length > 0) {
          error.children.forEach(extractErrors);
        } else {
          const constraints = error.constraints || {};
          Object.values(constraints).forEach(message => {
            formattedErrors.push({
              field: error.property,
              message: message
            });
          });
        }
      };
  
      validationErrors.forEach(extractErrors);
      return formattedErrors;
    }
}