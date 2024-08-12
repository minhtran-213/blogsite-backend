import { Types } from "mongoose";

export interface AuthPayload {
    id: Types.ObjectId,
    name: string,
    username: string,
    email: string
}
