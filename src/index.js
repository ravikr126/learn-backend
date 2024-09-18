// require('dotenv').config({path: './env'})

import dotenv from 'dotenv'
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})
    connectDB()
    .then(()=>{
app.listen(process.env.PORT || 8000)
    },()=>{
        console.log(`server is running at ${process.env.PORT}`);
        
    })
    .catch((err)=>{
        console.log('Mongo db connection failed !!!', err);
        
    })
 

//long way 1st method

// ;(async()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // db url , db name
//        app.on("errorrr",(error)=>{
//         console.log('ERR:',error);
//         throw error
//        })
//        app.listen(process.env.PORT, ()=>{
//         console.log(`App is listening on port ${process.env.PORT}`);
        
//        })
//     } catch (error) {
//         console.log(error);
//         throw error;
        
//     }
// })(
   
// )