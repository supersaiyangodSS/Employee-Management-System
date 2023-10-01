import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/UserInterface.js"

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    verified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        required: true,
    },
    isTokenUsed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const User = model("User", userSchema);

export default User;
