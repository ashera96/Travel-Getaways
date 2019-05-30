const express = require("express");
const router = express.Router();

var pageview = require("../models/userstat");

router.post("/addView", (req, res) => {
  var dateObj = new Date();
  var cnt = 1;
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var id = day + "/" + month + "/" + year;
  pageview
    .findOne({ _id: id })
    .exec()
    .then(res => {
      if (res.length <= 0) {
        const view = new pageview({
          _id: id,
          year: year,
          month: month,
          date: day,
          count: count
        });
        view.save().then(res => {
          console.log(res);
        });
      } else {
        cnt = res[0].count;
        cnt++;
        pageview
          .findOneAndUpdate({ _id: id }, { count: cnt })
          .exec()
          .then(res => {
            console.log("updated view count to " + cnt);
          });
      }
    });
  console.log(id);
  console.log("website user detected");
});

//get Analytics route

router.post("/Get_Analytics", (req, res) => {
  var dateObj = new Date();
  var cnt = 1;
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var id = day + "/" + month + "/" + year;
  var returnList = new Array(30).fill(0);
  //Asuming that a month has 30 days
  var remaining = 30 - day;
  for (let days = remaining; days < 30; days++) {
    var id = days + "/" + month + "/" + year;
    pageview
      .findOne({ _id: id })
      .exec()
      .then(res => {
        let viewcount = res[0].count;
        if (viewcount) {
          returnList[days] = viewcount;
        } else {
          console.log("error @line60");
        }
      });
  }
  for (let days = 0; days < day; days++) {
    let id = days + "/" + month + "/" + year;
    pageview
      .findOne({ _id: id })
      .exec()
      .then(res => {
        let viewcount = res[0].count;
        if (viewcount) {
          returnList[days] = viewcount;
        } else {
          console.log("error @line77");
        }
      });
  }
  console.log(returnList);
  res.send({ result: returnList });
});

module.exports = router;
