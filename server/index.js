var express = require("express");
//const MongoClient = require("mongodb");
//var mongoose = require(__dirname + "/mlab.js");
var app = express();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const uri = "<<MongoURI>>";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.post("/GetUsers", (req, res) => {
  client.connect(err => {
    const collection = client.db("travelGetaway").collection("users");
    // perform actions on the collection object
    collection.find({}).toArray(function(err, posts) {
      assert.equal(err, null, "no post object present in line 40");
      console.log("found following users");
      console.log(posts);
      res.send(posts);
    });

    client.close();
  });
});

app.post("/GetPosts", (req, res) => {
  client.connect(err => {
    const collection = client.db("travelGetaway").collection("posts");
    // perform actions on the collection object
    collection.find({}).toArray(function(err, posts) {
      assert.equal(err, null, "no post object present in line 40");
      console.log("found following users");
      console.log(posts);
      res.send(posts);
    });

    client.close();
  });
});

app.listen(3000, function() {
  console.log("server listning on port 3000");
});
