import { IsDate, IsEmail, IsEmpty, IsNotEmpty, IsOptional } from "class-validator"

import { Gender } from "src/common/enums"

export class CreateUserRequest {

    @IsNotEmpty({message: "First name is mandatory"})
    firstName: string
    lastName?: string
    @IsOptional()
    @IsDate({message: "Date is not in correct format"})
    dateOfBirth?: Date
    gender?: Gender
    avatarUrl: string
    @IsNotEmpty({message: "Password is mandatory"})
    password: string
    preferredName?: string
    @IsNotEmpty({message: "Email is mandatory"})
    @IsEmail()
    email: string
}
