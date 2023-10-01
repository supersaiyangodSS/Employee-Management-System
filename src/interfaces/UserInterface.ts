import { Document } from "mongoose";

export interface IUser extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    verified: boolean,
    token: string,
    isTokenUsed: boolean,
    created_at: Date,
    updated_at: Date,
}