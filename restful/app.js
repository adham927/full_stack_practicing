// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const mongoose = require('mongoose');

// const app = express();

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(express.static("public"));

// const mongo_compass = "mongodb://localhost:27017";
// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongo_compass).then(() => { console.log('Connected to MongoDB:') }) 
//   .catch((err) => { console.log('MongoDB connection error: %s \n', err); })
// }

// app.get("/article",function(req,res){
//     res.send("checking connection");
// })

// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

   const mongoDB = "mongodb://127.0.0.1:27017/wikiDB";
   mongoose.connect(mongoDB, {useNewUrlParser: true,useUnifiedTopology: true})
   .then(()=> {
    console.log("connected to mongodb");
   })
   .catch((err) => {
    console.log("error connecting to mongodb", err);
   }
   )


const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route('/articles')
    .get((req, res) => {
        Article.find().then(function(result){
            res.send(result)
        }).catch(function(err){
            console.log(err);
        })
    })
    .post((req, res) => {
        console.log(req.body.title);
    console.log(req.body.content);
    const article_1 = new Article({
        title:  req.body.title,
        content: req.body.content
    });
    article_1.save();
    })
    .delete((req,res) => {
        Article.deleteMany().then(function(){
            console.log("Data deleted"); // Success
        }).catch(function(error){
            console.log(error); // Failure
        });
    })
    
app.route("/articles/:myArticle")
.get(function(req,res){
        Article.findOne({title: req.params.myArticle})
            .then((result)=>{
                res.send(result);
            })
            .catch((err)=>{
                console.log(err);
            });
})
.put(function(req,res){
    Article.updateOne({title: req.params.myArticle},{content: req.body.content},{overrite: true})
    .then((result) => {
        res.send("updated successfully");
    })
    .catch((err) => {
        console.log(err);
    })
})
.patch(function(req,res){
    Article.updateOne({title: req.params.myArticle},{$set:req.body})
    .then((result) => {
        res.send("updated successfully");
    })
    .catch((err) => {
        console.log(err);
    })
})
.delete(function(req,res){
    Article.deleteOne({title: req.params.myArticle})
    .then((result) => {
        res.send("deleted successfully");
    })
    .catch((err) => {
        console.log(err);
    })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});