import { registerEnumType } from "@nestjs/graphql";

export enum UserRole {
    READER = "READER",
    AUTHOR = "AUTHOR",
    ADMIN = "ADMIN"
}

registerEnumType(UserRole, {name: 'UserRole'})

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

registerEnumType(Gender, {name: 'Gender'})