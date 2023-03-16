
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");






const app = express();
const PORT = process.env.PORT || 3000;

const dbURL = process.env.MONGO_URL;


mongoose.connect(dbURL)
.then(()=>{
    console.log('mongodb atlas is connected');
})
.catch((error)=>{
    console.log(error.message);
    process.exit(1);
});



app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/./views/index.html")
});

app.post("/register",(req,res)=>{
    try{
        const newUser = new User(req.body);
         newUser.save();
        res.status(201).json(newUser)

    }catch(error){
        res.status(500).json(error.message);
 
    }
});



app.post("/login",(req,res)=>{
    res.status(201).json({message:"user is login"});
    });


app.use((req,res,next)=>{
    res.status(404).json({message:"route not found"});
});


app.use((error,req,res,next)=>{
    res.status(500).json({message:"something error"});
});




app.listen(PORT,()=>{

    console.log(`server is running at http://localhost:${PORT}`);
    
});





