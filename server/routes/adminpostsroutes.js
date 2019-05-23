const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const multer = require("multer");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const uri =
  "mongodb+srv://admin:marper96@cluster0-dtohb.gcp.mongodb.net/test?retryWrites=true";

router.post("/GetPosts", (_req, res) => {
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

router.post("/deletePosts", (req, res) => {
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

module.exports = router;
