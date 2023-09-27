import { Request, Response } from "express";
import User from '../models/User.js';
import { validationResult } from "express-validator";

 const addUser = async ( req : Request, res : Response ) => {
    const errors = validationResult(req);
    const { firstName, lastName, email, password } = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array().map((key) => key.msg)})
    }
    try {
        const user = await User.findOne({ email });
       if (user) {
            return res.status(409).json({
                conflict: `${email} already exists!`
            });
        }
        res.status(200).json({
            noUser: `no user with the email: ${email}`,
        })
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error!'});
    }
}

export { addUser }