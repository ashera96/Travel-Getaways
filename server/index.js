var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const multer = require("multer");
//const MongoClient = require("mongodb");
//var mongoose = require(__dirname + "/mlab.js");
var app = express();
app.use(cors());
//json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//setting parser for express
app.use(jsonParser);
app.use(urlencodedParser);
//Cors setup
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);

const multerconfig = {
  storage: multer.diskStorage({
    destination: function(req, file, next) {
      next(null, "/public/images");
    },
    filename: function(req, file, next) {
      console.log(file);
    }
  })
};

// end of setup

const uri =
  "mongodb+srv://admin:marper96@cluster0-dtohb.gcp.mongodb.net/test?retryWrites=true";
//const uri = "<<MongoURI>>";
//const client = new MongoClient(uri, { useNewUrlParser: true });

app.post("/GetUsers", (req, res) => {
  console.log("get users called");
  const client = new MongoClient(uri, { useNewUrlParser: true });
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
  console.log("get posts called");
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("travelGetaway").collection("posts");
    // perform actions on the collection object
    collection.find({}).toArray(function(err, posts) {
      assert.equal(err, null, "no post object present in line 40");
      console.log("found following users");
      console.log(posts);
      res.send(posts);
      client.close();
    });
  });
});
app.post("/Uploads", multer(multerconfig).single("photo"), function(req, res) {
  res.send("photo uploaded");
});

app.post("/UpdateUser", function(req, res) {
  console.log("updating user");
  var id = req.body.id;
  console.log("id : " + id);
  var act = req.body.val;
  console.log(act);

  if (act === "accept") {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("travelGetaway").collection("users");
      // perform actions on the collection object
      collection.updateOne(
        { _uname: id },
        { $set: { _status: "Active" } },
        (err, res) => {
          if (err) console.log(err.errmsg);
          else {
            console.log(res.result);
          }
        }
      );
      res.send({ status: "ok" });
    });
  } else if (act === "ban") {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("travelGetaway").collection("users");
      // perform actions on the collection object
      collection.updateOne(
        { _uname: id },
        { $set: { _status: "Banned" } },
        (err, res) => {
          if (err) console.log(err.errmsg);
          else {
            console.log(res.result);
          }
        }
      );
      res.send({ status: "ok" });
    });
  } else if (act === "unban") {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("travelGetaway").collection("users");
      // perform actions on the collection object
      collection.updateOne(
        { _uname: id },
        { $set: { _status: "Active" } },
        (err, res) => {
          if (err) console.log(err.errmsg);
          else {
            console.log(res.result);
          }
        }
      );
      res.send({ status: "ok" });
    });
  } else {
    res.send("error");
  }
});
//delete posts route
app.post("/deletePosts", (req, res) => {
  console.log("delete posts called");
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("travelGetaway").collection("posts");
    // perform actions on the collection object
    try {
      collection.deleteOne({ _title: req.body.val });
    } catch (e) {
      console.log(e);
    }
    res.send("OK");
  });
});

app.listen(3000, function() {
  console.log("server listning on port 3000");
});
