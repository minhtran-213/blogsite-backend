import { Gender, UserRole } from "src/common/enums";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Types } from "mongoose";

@Schema()
export class User {

    _id: Types.ObjectId
    
    @Prop({required: true, unique: true})
    email: string
    
    @Prop({type: Date})
    dateOfBirth?: Date

    @Prop({type: String, enum: Gender})
    gender?: Gender

    @Prop({type: [String], enum: UserRole, default: UserRole.USER})
    roles: UserRole[]

    @Prop()
    shortDescription?: string

    @Prop()
    avatarUrl?: string

    @Prop()
    preferredName?: string

    @Prop({required: true})
    firstName: string

    @Prop()
    lastName?: string

    @Prop({required: true})
    password: string

    @Prop({required: false, type: [String]})
    interests?: string[]

    @Prop({required: false})
    professional?: string
}

export const UserSchema = SchemaFactory.createForClass(User)