const express= require("express");
const {UserModel}= require("../models/user.model");

const modifyRouter= express.Router();

modifyRouter.patch("/update/:id",async(req,res)=>{
    const ID= req.params.id;
    const payload=req.body;
    try {
        await UserModel.findByIdAndUpdate({_id:ID},payload);
        res.send("Details has been updated");

    } catch (err) {
        console.log({"msg":"Something went wrong while updating data."});
        console.log(err);
        res.send({"msg":"Something went wrong while updating data."})
    }
});

modifyRouter.delete("/delete/:id",async(req,res)=>{
    const ID= req.params.id;
    try {
        await UserModel.findByIdAndDelete({_id:ID});
        res.send("User has been Deleted");

    } catch (err) {
        console.log({"msg":"Something went wrong while Deleting data."});
        console.log(err);
        res.send({"msg":"Something went wrong while Deleting data."})
    }
});



module.exports={
    modifyRouter
}