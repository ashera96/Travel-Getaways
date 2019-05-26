const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const multer = require("multer");
var adminUser = require("../models/adminuser");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var decodedToken = "";

// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const uri =
  "mongodb+srv://admin:marper96@cluster0-dtohb.gcp.mongodb.net/test?retryWrites=true";

router.post("/register", function(req, res, next) {
  var adminuser = new adminUser({
    email: req.body.email,
    _uname: req.body.username,
    _pwd: bcrypt.hashSync(req.body.password, 10),
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
// #######################################
//USER LOGIN
//########################################
router.post("/login", function(req, res, next) {
  let promise = adminUser.findOne({ _uname: req.body.username }).exec();

  promise.then(function(doc) {
    if (doc) {
      console.log(doc);
      if (bcrypt.compareSync(req.body.password, doc._pwd)) {
        // generate token

        let token = jwt.sign({ username: doc._uname }, "secret", {
          expiresIn: "3h"
        });

        return res.status(200).json(token);
      } else {
        return res.status(501).json({ message: " Invalid Credentials" });
      }
    } else {
      return res.status(501).json({ message: "User is not registered." });
    }
  });

  promise.catch(function(err) {
    console.log(err);
    return res.status(501).json({ message: "Some internal error" });
  });
});
//#######################################
//UTIL ROUTES
//#######################################

router.post("/GetUsers", verifyToken, (req, res) => {
  console.log("get users called");
  const client = new MongoClient(uri, { useNewUrlParser: true });
  if (this.token != "error") {
    client.connect(err => {
      const collection = client.db("travelGetaway").collection("users");
      // perform actions on the collection object
      collection.find({}).toArray(function(err, posts) {
        assert.equal(err, null, "no User object present in line 40");
        console.log("found following users");
        console.log(posts);
        res.send(posts);
      });

      client.close();
    });
  }
});

router.post("/UpdateUser", verifyToken, function(req, res) {
  console.log("updating user");
  var id = req.body.id;
  console.log("id : " + id);
  var act = req.body.val;
  console.log(act);
  if (this.token != "error") {
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
  } else {
    res.send("invalid token");
  }
});

function verifyToken(req, res, next) {
  let token = req.body.params.updates[0].value;
  console.log(token);

  jwt.verify(token, "secret", function(err, tokendata) {
    if (err) {
      //console.log(err);
      // return res.status(400).json({ message: " Unauthorized request" });
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  });
}

module.exports = router;
