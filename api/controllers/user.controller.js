import {errorHandeler}  from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'



export const user = (req,res)=>{
    res.json({'message':"hello world 2"})
    
  
    
}
export const upDateUserInfo= async (req,res,next)=>{

  
    
 //if (req.user.id!==req.params.id) return next(errorHandeler(402,'you can only update own account'))
   
    try {

      
    if(req.body.password){
        req.body.password=bcryptjs.hashSync(req.body.password,10)
    }
   
    const updateUser = await User.findByIdAndUpdate(req.user.id,{
        $set:{
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        avatar:req.body.avatar,
        }
    }, {new:true})
   
   
     const {password,...rest}=updateUser._doc;


        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }


}