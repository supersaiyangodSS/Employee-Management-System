import { Router } from 'express';
import { addUser, verifyUser } from '../controllers/registerController.js';
import { body } from 'express-validator';

const router = Router();
const validateFullUser = [
    body('firstName').notEmpty().withMessage('first Name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().notEmpty().withMessage('Invalid Email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be 8 characters long')
    .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    body('confirmPassword').notEmpty().withMessage('Confirm password is required')
]

router.route('/')
.post(validateFullUser, addUser)

router.get('/verify', verifyUser);

export default router;