import mongoose from "mongoose";
const userSchema=new mongoose.Schema({},{timeStamp:true})

export const User = mongoose.model('User',userSchema)