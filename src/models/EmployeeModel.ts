import { Schema, model } from "mongoose";
import { IEmployee } from "../interfaces/EmployeeInterface.js";

const employeeSchema = new Schema<IEmployee>({
    employeeID: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

const Employee = model("Employee", employeeSchema);

export default Employee;