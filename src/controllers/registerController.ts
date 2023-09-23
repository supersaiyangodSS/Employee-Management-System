import { Request, Response } from "express";
import User from '../models/User.js'

 const addUser = async ( req : Request, res : Response ) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    
}

export { addUser }