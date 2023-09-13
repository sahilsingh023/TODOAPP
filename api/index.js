var express = require("express");
var MongoClient = require("mongodb").MongoClient; 
var cors = require("cors");
const multer = require("multer");

var app = express();
app.use(cors());

var CONNECTION_STRING =
  "mongodb+srv://sahilsingh:7236004388@cluster0.hu16axz.mongodb.net/?retryWrites=true&w=majority";

var DATABASENAME = "todoappdb";
var database;

app.listen(5038, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => { 
    database = client.db(DATABASENAME);
    console.log("mongo DB connection successful");
  });
});

app.get('/api/todoapp/GetNotes', (req, res) => { 
  database.collection("todoappcollection").find({}).toArray((error, result) => {
    res.send(result); 
  });
});

app.post('/api/todoapp/AddNotes',multer().none(),(req, res)=>{
  console.log("connected");
  database.collection("todoappcollection").count({},function(error,numofDocs){
    database.collection("todoappcollection").insertOne({
      id:(numofDocs+1).toString(),
      description:req.body?.newNotes ? req.body?.newNotes : ""
    });
    res.json("Added Succesfully");
  });
});

app.delete('/api/todoapp/DeleteNotes',(req, res)=>{
  database.collection("todoappcollection").deleteOne({
    id:req.query.id
  });
  res.json("Delete Successfully");
});

