import express from "express";
import path from "path";

const app = express();

const users= [];
//middlewere
app.use(express.static(path.join(path.resolve(), "public")));


app.use(express.urlencoded({extended: true}))

//Settingf up view engine
app.set("view engine","ejs");

app.post("/",(req,res)=>{
   
   users.push({username: req.body.name, email: req.body.email});
    res.b ("success")
   
})

app.listen(5000,() =>{
    console.log("server is working");
})
