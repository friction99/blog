import express from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import ejs from 'ejs';
import _ from 'lodash';
const app = express();
const PORT = 3000;
mongoose.connect("mongodb://0.0.0.0:27017/BlogDB");
const BlogSchema = new mongoose.Schema({
    title:"String",
    body:"String"
});
const blog = new mongoose.model("blog",BlogSchema);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
const POSTS = [];
const date = new Date();
const year = date.getFullYear();
app.get("/",(req,res)=>{
   blog.find({})
   .then((iterates)=>{
        res.render("index.ejs",{YEAR:year,data:iterates});
   })
   .catch((err)=>{
        console.log(err);
   })
});
app.get("/post/:postId",(req,res)=>{
    const token = req.params.postId;
    blog.findOne({_id:token})
    .then((iterate)=>{
        res.render('post.ejs',iterate);
    })
    .catch((err)=>{
        console.log(err);
    })
});
app.get("/about",(req,res)=>{
    res.render("about.ejs");
})
app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
})
app.get("/compose",(req,res)=>{
    res.render("compose.ejs");
})
app.post("/submit",(req,res)=>{
    const Blog = new blog({
        title:req.body.filename,
        body:req.body.blog
    })
    Blog.save();
    res.redirect("/");
})
app.listen(PORT,()=>{
    console.log(`Our server is up and running on port ${PORT}`)
})