import mongoose from "mongoose";

const categorySchema= new mongoose.Schema({
name:{
    type:String,
    required:true,
},
images:{
    type:String,
}
},{timeStamp:true})

export const Category= mongoose.model('category',categorySchema)