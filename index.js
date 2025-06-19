const express=require("express");
const jwt=require("jsonwebtoken")
const {UserModel, TodoModel}=require("./db.js");
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://23bcs012:kdgHOZKRgE4PBzyO@cluster0.s0oxaej.mongodb.net/users")
const app=express();
const JWT_SECRET="aman";
app.use(express.json());
app.post("/signup",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    await UserModel.create({
        email:email,
        password:password,
        name:name
    })
    res.json({
        message:"you are singed up"
    })
})




app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const user=await UserModel.findOne({
        email:email,
        password:password
    })
    console.log(user)
    if(user){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_SECRET)
        res.json({
            token:token,
            message:"you are signed in"

        });
    }else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }

})

 function authmiddle(req,res,next){
     const token=req.headers.token;
    const decodedData= jwt.verify(token,JWT_SECRET);
    console.log(decodedData.id);
    if(decodedData.id){
        req.id=decodedData.id;
        next();
    }else{
        res.json({
            message:"youare not singned in"
        })
    }
}



app.post("/todo",authmiddle,async function(req,res){
        const id=req.id;
        const task=req.body.task;
        const stat=req.body.stat;
        await TodoModel.create({
             todo_name:task,
              done:stat,
              userId:id
        })
        res.json({
            message:"task added"
        });


})




app.get("/todos",function(req,res){

})
app.listen(3000);
