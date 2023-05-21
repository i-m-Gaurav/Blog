// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const _ = require('lodash');
// const homeStartingContent = "This is for Home page";
// const aboutContent = "This is for about page";
// const contactContent = "This is for contact page";



// const posts = [];



// const app = express();
// app.use(bodyParser.urlencoded({extended:true}));
// app.set('view engine','ejs');

// app.use(express.static("public"));

// app.get("/", function(req,res){
//     res.render("home",{homepage: homeStartingContent,posts:posts});
// });

// app.get("/about",function(req,res){
//     res.render("about",{about:aboutContent});
// });

// app.get("/contact",function(req,res){
//     console.log(req.params.num)
//     res.render("contact",{contact:contactContent});
// })

// app.get("/compose",function(req,res){
//     res.render("compose");
// })


// app.post("/compose", function(req,res){

//     let post = {
//         title : req.body.title,
//         contents: req.body.content
//     }

//     posts.push(post);
//     res.redirect("/");
    
   

// })



// app.get("/post/:newPost", function(req,res){

//     var requestTitle = _.lowerCase(req.params.newPost); 

//     posts.forEach(function(post){
//         var storedTitle = _.lowerCase(post.title);
//         if(requestTitle === storedTitle){
//             console.log("Match Found");

//             res.render("post",{Title:storedTitle,Content:post.contents});

//         }
       
//     })

    

    


// })




// app.listen(8081,function(){
//     console.log("Server is running on 8081");
// })


const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const homeStartingContent = "This is for Home page";
const aboutContent = "This is for about page";
const contactContent = "This is for contact page";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin-gaurav:gaurav123@cluster0.hozaezv.mongodb.net/dailyBlog", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

// Define a post schema
const postSchema = new mongoose.Schema({
  title: String,
  contents: String
});

// Create a Post model based on the schema
const Post = mongoose.model('Post', postSchema);

app.use(express.static("public"));

app.get("/", function (req, res) {
  Post.find({})
    .then(function (posts) {
      res.render("home", { homepage: homeStartingContent, posts: posts });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/about", function (req, res) {
  res.render("about", { about: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.title,
    contents: req.body.content
  });

  post.save()
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/post/:newPost", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.newPost);

  Post.findOne({ title: requestedTitle })
    .then(function (post) {
      if (post) {
        res.render("post", { Title: post.title, Content: post.contents });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(8081, function () {
  console.log("Server is running on port 8081");
});