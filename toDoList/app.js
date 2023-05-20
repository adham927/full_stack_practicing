const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
var today = new Date();
var day;
if(today.getDay()<=4){
    day = "weekday";
}

else{
    day = "weekend";
}
res.render("list", {kindOfDay:day});
})

app.listen("3000",function(){
    console.log("the server is liistining to 3000 port");
})
