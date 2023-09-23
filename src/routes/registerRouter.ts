import { Router } from 'express';
import { addUser } from '../controllers/registerController.js';

const router = Router();

router.get('/', addUser);

export default router;