const express= require("express");
const {UserModel}= require("../models/user.model");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

const userRouter= express.Router();

userRouter.post("/register",async(req,res)=>{
    const {username,email,location,role,password} = req.body;
    try {
        bcrypt.hash(password, 5, async(err, secure_password)=> {
            if(err){
                console.log(err)
            }
            else{
                const user = new UserModel({username,email,location,role,password:secure_password});
                await user.save();
                res.send("Registered")
            }
        });
    } catch (err) {
        console.log("Error while register the data.");
        console.log(err);
        res.send("Error while register the data.")
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body;
    try {
        const user = await UserModel.find({email});
        // const hashed_password= user[0].password;

        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token= jwt.sign({userID:user[0]._id},"masai");
                    res.send({"msg":"Login Done","token":token,"username":user[0].username});

                }
                else{
                    res.send({"msg":"Wrong Credentials"});
                }
            })
        }
        else{
            res.send("Wrong Credentials")
        }
    } catch (err) {
        console.log("Error while Login");
        console.log(err);
        res.send("Error while Login")
    }
});

module.exports={
    userRouter
}
