import { IsDate, IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsStrongPassword } from "class-validator"

import { Gender } from "src/common/enums"

export class CreateUserRequest {

    @IsNotEmpty({message: "First name is mandatory"})
    firstName: string

    lastName?: string

    @IsOptional()
    @IsDateString()
    dateOfBirth?: Date

    gender?: Gender

    @IsNotEmpty({message: "Password is mandatory"})
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }, {message: 'Invalid password format'})
    password: string

    preferredName?: string

    @IsNotEmpty({message: "Email is mandatory"})
    @IsEmail()
    email: string

    profession?: string

    interests?: string[]
}
