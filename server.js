const mongoose = require('mongoose');
const express =  require('express');
const server = express();
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const PORT = process.env.PORT || 5000;
const path = require("path");
// mongodb+srv://Hammad:Hammad@cluster0.pbfho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb://localhost:27017/hamzamessages
mongoose.connect("mongodb+srv://Hammad:Hammad@cluster0.pbfho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Mongoose Connectd")
})

//parse requset to body-parsar
server.use(bodyparser.urlencoded({extended:true}));
//setting views engine
server.set("view engine","ejs");
server.set("views",path.resolve(__dirname,"views/"));
//setting paths
server.use('/css',express.static(path.resolve(__dirname,"assets/css")));
server.use('/images',express.static(path.resolve(__dirname,"assets/images")));
server.use('/js',express.static(path.resolve(__dirname,"assets/js")));
server.use('/font',express.static(path.resolve(__dirname,"assets/font")));
server.use('/sass',express.static(path.resolve(__dirname,"assets/sass")));

server.get("/", (req,res)=>{
    res.render("index", { data: "null"});
})
const MessageSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    }
})
const Message = mongoose.model("HammmadMessage", MessageSchema);
server.post("/sendMessage", async(req,res)=>{
    const data = new Message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })
   await data.save().then(()=>{
       res.render("index", {data: "saved"});
    }).catch(err=>{
        console.log(err);
    })
})
server.get("/messages", async(req, res)=>{
    const data = await Message.find({});
    res.render("messages", { data: data });
})
server.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})
