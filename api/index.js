import express from 'express'
import 'dotenv/config'
import {conectDb} from './db/connectDb.js'
// import User from './models/user.model.js'
import userRouter from "./routes/user.route.js"
const app = express()


app.use('/api/user',userRouter)


// const users = async ()=>{
//    const ss=  await User.create({
//      username:'muayad',
//      email:"muayad@gmai.com",
//      password:"hi"
//     })

//     console.log(ss);
    
// }
// users()




const start= async () => {
try{
   await conectDb(process.env.connectDB)
    app.listen( 3000 , ()=>{
        console.log('sever running on port 3000 ')
        }) 
} catch (e){
    console.log(e);
    

}

}

start()
