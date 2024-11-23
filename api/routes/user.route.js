import express from 'express'
import {user,upDateUserInfo,deleteUser} from '../controllers/user.controller.js'
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router()

router.get('/test',user)
router.post('/update/:id',verifyToken,upDateUserInfo)
router.delete('/delete/:id',verifyToken,deleteUser)

export default router