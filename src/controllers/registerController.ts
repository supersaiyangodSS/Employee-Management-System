import { Request, Response } from "express";
import User from '../models/UserModel.js';
import { validationResult } from "express-validator";
import { hash, compare } from 'bcrypt';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vedantsapalkar99@gmail.com',
        pass: 'kprx vfgn vapl kgjb'
    }
});
const saltRound: number = 10;
const generateToken = () => {
    return randomBytes(20).toString('hex');
}

async function sendRegistrationMail(email: string, verificationLink: string) {
    const mailOptions = {
        from: 'vedantsapalkar99@gmail.com',
        to: email,
        subject: `EMS Email Verification`,
        html: `<p>Thank you for signing up. Please click the link below to verify your email address:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>If you didn't sign up for this service, you can safely ignore this email.</p>
        <p>Best regards,<br>EMS</p>`
    }
    
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
const addUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { firstName, lastName, email, password } = req.body;
    const verificationToken: string = generateToken();
    const verficationLink = `http://localhost:4000/sign-up/verify?token=${verificationToken}`;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map((key) => key.msg) })
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                conflict: `${email} already exists!`
            });
        }
        try {
            await sendRegistrationMail(email, verficationLink);
            console.log('Email sent successfully');

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to send email' });
        }
        const hashedPassword = await hash(password, saltRound);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            token: verificationToken
        });
        await newUser.save();
        res.status(200).json({
            newUser: `user created successfully: ${firstName} ${lastName} ${email}`,
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error!' });
    }
}

const verifyUser = async ( req : Request , res : Response) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({
            token ,
            isTokenUsed: false,
        })
        if (!user) {
            return res.status(404).json({
                error: 'Invalid token'
            });
        }
        user.verified = true,
        user.isTokenUsed = true,
        user.token = generateToken();
        await user.save();
        return res.status(200).json({
            message: 'User verfied successfully'
        })
    } 
    catch (error) {
        console.error(error);
    }
}

export { addUser, verifyUser }