const mongoose = require('mongoose');
const express =  require('express');
const server = express();
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const PORT = process.env.PORT || 4000;
const path = require("path");
mongoose.connect("mongodb://localhost:27017/hamza",{
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
    res.render("index");
})

server.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})