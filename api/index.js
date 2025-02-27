import express from 'express'
import 'dotenv/config'
import { conectDb } from './db/connectDb.js'
// import User from './models/user.model.js'
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser'

import path from 'path'

const __dirname = path.resolve()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})
app.use((error, req, res, next) => {
    let stateCode = error.stateCode || 500;
    let message = error.message || 'internal server error'
    return res.status(stateCode).json(message)

})





const start = async () => {
    try {
        await conectDb(process.env.connectDB)
        app.listen(3000, () => {
            console.log('sever running on port 3000 ')
        })
    } catch (e) {
        console.log(e);


    }

}

start()
