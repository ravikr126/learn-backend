import mongoose from "mongoose"
const userSchema =new mongoose.schema({
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
  }
},{timeStamps:true})

export const user =mongoose.model("user",userSchema)
