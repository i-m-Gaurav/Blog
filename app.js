const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get("/", function(req,res){
    res.send("Hello");
})




app.listen(8081,function(){
    console.log("Server is running on 3000");
})