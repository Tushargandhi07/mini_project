const express= require("express");
const {connection}= require("./configs/db");
const {UserModel}= require("./models/user.model");
const {userRouter}= require("./routes/user.routes");
const {modifyRouter}= require("./routes/modify.users");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())
const port=3440;

app.get("/",(req,res)=>{
    res.send("Welcome")
});

app.get("/get",async(req,res)=>{
    try {
        const data= await UserModel.find();
        res.send(data);
    } catch (error) {
        console.log(err);
        res.send({"err":"Something went wrong while get the data."})   
    }
});

app.use("/users",userRouter);
app.use("/modifyuser",modifyRouter)


app.listen(port,async()=>{
    try {
        await connection;
        console.log({"msg":"Connected to DB."})
    } catch (error) {
        console.log({"msg":"Error while connecting to DB."})
    }
    console.log(`Server is running at port ${port}.`);
});