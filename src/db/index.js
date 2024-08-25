import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try {
  const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // db url , db name , mongoose return object 
        console.log(`\n mongoose connected ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("Mongooes connection error",error);
           process.exit(1);
                
    }
}

export default connectDB;