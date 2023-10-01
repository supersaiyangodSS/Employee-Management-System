import { Document } from "mongoose";

export interface IEmployee extends Document {
    firstName: string,
    lastName: string,
    employeeID: string,
    position: string,
    department: string,
    email: string,
    phone: number,
    startDate: Date,
    endDate: Date,
    active: boolean,
    age: number,
    created_at: Date,
    updated_at: Date
}