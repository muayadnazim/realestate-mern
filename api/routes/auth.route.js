import express from 'express'
import { signup ,sginIn} from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup',signup);
router.post('/signin',sginIn);

export default router