import { Request, Response } from "express";
import User from '../models/User.js';
import { validationResult } from "express-validator";
import { hash, compare } from 'bcrypt';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vedantsapalkar99@gmail.com',
        pass: 'kprx vfgn vapl kgjb'
    }
});
const saltRound : number = 10;

async function sendRegistrationMail(email: string) {
    const mailOptions = {
        from: 'vedantsapalkar99@gmail.com',
        to: email,
        subject: 'Test Subject',
        text: 'Test text'
    };

    try {
        await transporter.sendMail(mailOptions);
        return 'Email sent successfully!'
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

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
        try {
            await sendRegistrationMail(email);
            console.log('Email sent successfully');
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to send email'});
        }
        const hashedPassword = await hash(password, saltRound);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({
            newUser: `user created successfully: ${firstName} ${lastName} ${email}`,
        })
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error!'});
    }
}

export { addUser }