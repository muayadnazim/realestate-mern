import express from 'express'
import 'dotenv/config'
import {conectDb} from './db/connectDb.js'

const app = express()



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
