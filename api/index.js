import express from 'express'
import 'dotenv/config'
import {conectDb} from './db/connectDb.js'
// import User from './models/user.model.js'
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
const app = express()

app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((error,req,res,next)=>{
let stateCode = error.stateCode ||500;
let message = error.message||'internal server error'
 return res.status(stateCode).json(message)

})





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
