import express from "express";

const app = express();

//Settingf up view engine
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    // res.sendStatus(500);
    // res.json({
    //     success: true,
    //     product: [],
    // })

    res.render("index.ejs");
})

app.listen(5000,() =>{
    console.log("server is working");
})
