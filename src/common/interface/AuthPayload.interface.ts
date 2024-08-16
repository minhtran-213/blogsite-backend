import { Types } from "mongoose";

export interface AuthPayload {
    id: Types.ObjectId,
    name: string,
    email: string
}
