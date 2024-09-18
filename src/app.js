import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN  ,
    credentials:true

})) 

//configuration
app.use(express.json({limit: "16kb"}))  //this is for json data handling 
app.use(express.urlencoded({extended:true, limit: '16kb'})) // this is when we send data from url , see the example like hitesh%20+chaudary%20 and extended is used for nested search also
app.use(express.static('public'))



app.use(cookieParser())
export { app };
