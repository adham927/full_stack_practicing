const express = require("express");
const bodyParser = require("body-parser");
const todoitems = ["go to work","take a break","sleep"];
const workItems = [];
var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
var day;
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();
day = today.toLocaleDateString("en-US", options);
res.render("list", {kindOfDay:day, itemarrays:todoitems});
})

app.get("/work", function(req,res){
    res.render("list", {kindOfDay:"Work List", itemarrays:workItems});
})

app.post("/",function(req,res){
    if(req.body.button == "Work List"){
        const userinput = req.body.sometext;
        workItems.push(userinput);
        res.redirect("/work");
    }
    else{
        const userinput = req.body.sometext;
        todoitems.push(userinput);
        res.redirect("/");
    }
    
})

app.listen("3000",function(){
    console.log("the server is liistining to 3000 port");
})
