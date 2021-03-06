const express=require("express");
const mongoose =require("mongoose");
const app=express();
const path=require("path");
require("./db/conn");
const Register=require("./model/registration");
const port=process.env.PORT || 8000;
const hbs=require("hbs");
const res = require("express/lib/response");
const req = require("express/lib/request")

const viewPath=path.join(__dirname,"../src/views");
const dirPath=path.join(__dirname,"../src/public");

app.set("view engine","hbs");
app.set("views",viewPath);
app.use(express.static(dirPath));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("index.hbs");
});

app.post("/signup",async(req,res)=>{
    try{
        const userData= new Register({
            Name:req.body.Name,
            Contact:req.body.Contact
        })
        const Data= await userData.save();
        res.status(201).send("<h2>Congraluations you just got enrolled.</h2>");
    }catch(e){
        res.status(404).send("<h2>Error: Something went wrong Try again</h2>");
    }
  
})

app.post("/search",async(req,res)=>{
    try{
        const para1=req.body.Name
        const searchStudent=await Register.findOne({Name:para1});
        if(searchStudent!=null)
        {
            res.status(200)
            .send(`<h1>Matched. You are a user!</h1><h2>Name: ${searchStudent.Name} <br> Contact no: ${searchStudent.Contact}</h2>`);
        }
        else{
            res.status(404).send("<h1>Not Matched. Not a user</h1>");
        }
        
    }catch(e){
        res.status(400).send(e);
    }
})


app.listen(port,()=>{
    console.log("Sever running");
})
