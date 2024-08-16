import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './User.schema';
import { Model } from 'mongoose';
import { CreateUserRequest } from './User.request';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}


    async createNewUser(request: CreateUserRequest) {
        const newUser = new this.userModel(request)
        await newUser.save()
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email})
    }
}
