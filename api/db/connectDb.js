import mongoose from "mongoose";

export  const conectDb =(url)=>{
    return mongoose.connect(url)
}

