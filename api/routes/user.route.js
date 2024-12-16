import express from 'express'
import { user, upDateUserInfo, deleteUser, getUserList, getUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'
const router = express.Router()

router.get('/test', user)
router.post('/update/:id', verifyToken, upDateUserInfo)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listing/:id', verifyToken, getUserList)
router.get('/:id', verifyToken, getUser)


export default router