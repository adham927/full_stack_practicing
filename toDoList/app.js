const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const todoitems = [];
const workItems = [];
var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
const mongoDB = "mongodb+srv://ameradham152:ameradham@shopdbcluster.4fw6m0v.mongodb.net/toDoListDB";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const Schema = mongoose.Schema;
// const WorkItemss = new Schema({
//     name: String
//   });
// const workItem = mongoose.model("wItem", WorkItemss);
const dayTodayItems = new Schema({
  name: String
});
const dayTodayItemss = mongoose.model("dItem", dayTodayItems);

const lists = new Schema({
  name: String,
  items: []
});
const listss = mongoose.model("list", lists);

app.get("/",function(req,res){
// var day;
// var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// var today  = new Date();
// day = today.toLocaleDateString("en-US", options);
getItems().then(function(result){
  res.render("list", {kindOfDay:"Today", itemarrays: result});
})
})
//  async function getWorkItems(){

//     const Items = await workItem.find({});
//     return Items;
  
//   }
  async function getItems(){

    const Items = await dayTodayItemss.find({});
    return Items;
  
  }
// app.get("/work", function(req,res){



//     getWorkItems().then(function(result){
    
//         res.render("list", {kindOfDay:"Work List", itemarrays: result});    
//       });
// })

app.post("/",function(req,res){
  const userinput = req.body.sometext;
  const listTitle = req.body.button;

  const item = new dayTodayItemss({
    name: userinput
  })

  if(listTitle=="Today"){
        item.save();
        res.redirect("/");
  }
  else{
    listss.findOne({name: listTitle}).then((foundone)=>{
    if(foundone){
      foundone.items.push(item);
      foundone.save();
      res.redirect("/" + listTitle);
    }
     
    })
  }
})

app.post("/delete", function(req,res){
//   const listName = req.body.listName;
//   const itemId = req.body.input;
//   console.log(itemId);

//   if(listName == "Today"){
//     await dayTodayItemss.findByIdAndRemove(req.body.input)
//     .then(()=>console.log(`Deleted Successfully`)).catch((err) => console.log("Deletion Error: " + err));
//     res.redirect("/");
//   }
//   else{
//     //  listss.findOneAndUpdate( {name: listName}, {$pull: { items: { _id: itemId } } }, {new:true})
//     // .then(()=>{console.log(`Item Deleted Successfully`);
//     //  res.redirect("/"+listName);})
//     //  .catch((err) => console.log("there is Deletion Error: " + err));
    
//     await listss.findOneAndUpdate({name:listName}, {$pull: {items: {_id: itemId}}}, {
//       new: true
//     }).then(function (foundList)
//     {
//       res.redirect("/" + listName);
//     }).catch( err => console.log(err));
// }
const checkedItem = req.body.input;
const listName = req.body.listName;

if(listName === "today"){
 dayTodayItemss.deleteOne({_id: checkedItem}).then(function () {
     console.log("Successfully deleted");
     res.redirect("/");
  })
  .catch(function (err) {
     console.log(err);
   });
}else{
  listss.findOneAndUpdate({name: listName}, {$pull: {items: {name: checkedItem}}}, {new: true}).then(function (foundList)
  {
    res.redirect("/" + listName);
  });
}
});

app.get("/:customList",function(req,res){
   const customList = _.capitalize(req.params.customList);

 
  listss.findOne({name: customList}).then((foundone)=>{
    if(!foundone){
      const newList = new listss({ name: customList, items: []});
      newList.save();
      res.redirect("/" + customList);
    }
    else{
      res.render("list", {kindOfDay: foundone.name, itemarrays: foundone.items});
    }
  })
  .catch((err)=>{
    console.log(err);
  }

  )

})

app.listen("3000",function(){
    console.log("the server is liistining to 3000 port");
})
