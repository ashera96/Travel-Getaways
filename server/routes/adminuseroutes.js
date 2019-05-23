const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const multer = require("multer");
var adminUser = require("../models/adminuser");
var jwt = require("jsonwebtoken");

// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const uri =
  "mongodb+srv://admin:marper96@cluster0-dtohb.gcp.mongodb.net/test?retryWrites=true";

router.post("/register", function(req, res, next) {
  var adminuser = new adminUser({
    email: req.body.email,
    _uname: req.body.username,
    _pwd: User.hashPassword(req.body.password),
    _status: "Pending",
    creation_dt: Date.now()
  });

  let promise = adminuser.save();

  promise.then(function(doc) {
    return res.status(201).json(doc);
  });

  promise.catch(function(err) {
    return res.status(501).json({ message: "Error registering user." });
  });
});

router.post("/GetUsers", (req, res) => {
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

router.post("/UpdateUser", function(req, res) {
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

module.exports = router;
