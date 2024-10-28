import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import {errorHandeler} from '../utils/error.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const signup = async (req,res,next)=>{

const {username,email,password}=req.body;
const hashpassword = bcryptjs.hashSync(password,10)
const newUser = new User({username,email,password:hashpassword});

try {
    await newUser.save()
    res.status(201).json('user is created')
} catch (error) {
    next(error)
}



}


export const sginIn = async (req,res,next)=>{
const {email,password}= req.body

try {
const vaildUser = await User.findOne({email})
const vaildPassword = bcryptjs.compare(password,vaildUser.password)
    if(!vaildPassword){return next(errorHandeler(401,'wrong credentials'))}

    const token = jwt.sign({id:vaildUser._id},process.env.JWT_SECRET)
    const {password:pass,...rest}=vaildUser._doc;
    res.cookie('access_token',token,{httpOnly:true,expires:new Date(Date.now()+30*24*60*60*1000)}).status(200).json({rest})
} catch (error) {
    next(error)
}


}