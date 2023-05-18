const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const homeStartingContent = "This is for Home page";
const aboutContent = "This is for about page";
const contactContent = "This is for contact page";

const posts = [];



const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get("/", function(req,res){
    res.render("home",{homepage: homeStartingContent,posts:posts});
});

app.get("/about",function(req,res){
    res.render("about",{about:aboutContent});
});

app.get("/contact",function(req,res){
    console.log(req.params.num)
    res.render("contact",{contact:contactContent});
})

app.get("/compose",function(req,res){
    res.render("compose");
})


app.post("/compose", function(req,res){

    let post = {
        title : req.body.title,
        contents: req.body.content
    }

    posts.push(post);
    res.redirect("/");
   

})



app.get("/post/:newPost", function(req,res){

    var requestTitle = _.lowerCase(req.params.newPost); 

    posts.forEach(function(post){
        var storedTitle = _.lowerCase(post.title);
        if(requestTitle === storedTitle){
            console.log("Match Found");

            res.render("post",{Title:storedTitle,Content:post.contents});

        }
       
    })

    

    


})




app.listen(8081,function(){
    console.log("Server is running on 8081");
})