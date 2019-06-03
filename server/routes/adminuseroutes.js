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
    let promise = adminUser.find().exec();

    promise.then(function(doc) {
      if (!doc) {
        res.send({ error: "null values" });
      } else {
        console.log(doc);
        res.json({ results: doc });
      }
    });
  }
});

router.post("/UpdateUser", verifyToken, function(req, res) {
  console.log(req.body.bodyObject);
  console.log("updating user");
  var id = req.body.bodyObject.id;
  console.log("uname : " + id);
  var act = req.body.bodyObject.val;
  console.log(act);
  if (this.token != "error") {
    if (act === "accept") {
      adminUser.updateOne(
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
    } else if (act === "ban") {
      adminUser.updateOne(
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
    } else if (act === "unban") {
      adminUser.updateOne(
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
