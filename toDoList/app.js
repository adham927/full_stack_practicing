const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const todoitems = ["go to work","take a break","sleep"];
const workItems = [];
var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
const mongoDB = "mongodb://127.0.0.1/toDoListDB";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const Schema = mongoose.Schema;
const WorkItemss = new Schema({
    name: String
  });
const workItem = mongoose.model("wItem", WorkItemss);

app.get("/",function(req,res){
var day;
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();
day = today.toLocaleDateString("en-US", options);
res.render("list", {kindOfDay:day, itemarrays:todoitems});
})
async function getItems(){

    const Items = await workItem.find({});
    return Items;
  
  }
app.get("/work", function(req,res){
    getItems().then(function(result){
    
        res.render("list", {kindOfDay:"Work List", itemarrays: result});    
      });
})

app.post("/",function(req,res){
    if(req.body.button == "Work List"){
        const userinput = req.body.sometext;
        // workItems.push(userinput);
        const newItem = new workItem({ name: userinput});
        newItem.save();
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
