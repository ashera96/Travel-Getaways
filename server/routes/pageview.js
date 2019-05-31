const express = require("express");
const router = express.Router();

var pageview = require("../models/userstat");

router.post("/addView", (req, res) => {
  console.log("add view route called");
  var dateObj = new Date();
  var cnt = 1;
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var id = day + "/" + month + "/" + year;
  console.log(this.id);
  let doc = pageview
    .findOne({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      if (result === null) {
        const view = new pageview({
          _id: id,
          year: year,
          month: month,
          date: day,
          count: cnt
        });
        view.save().then((error, result) => {
          if (error) {
            res.send(error);
          } else {
            console.log(result);
            res.send(result);
          }
        });
      } else {
        console.log(result);
        cnt = result.count;
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

router.post("/Get_Analytics", calculate_pageViews, (req, res) => {
  console.log("get analytics called");
});

async function calculate_pageViews(req, res) {
  var dateObj = new Date();
  var cnt = 1;
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var id = day + "/" + month + "/" + year;
  var returnList = new Array(30).fill(0);
  var save_i = 0;
  var asyinc1 = false;
  var asyinc2 = false;
  //Asuming that a month has 30 days
  var remaining = 30 - day;
  let prevmonth = month - 1;
  var id = day + "/" + prevmonth + "/" + year;
  console.log("getting data from " + remaining + " to 30");
  pageview
    .find({ month: prevmonth, date: { $gt: remaining, $lte: 30 } })
    .exec()
    .then(result => {
      console.log(result);
      let len = result.length;
      for (let i = 0; i < len; i++) {
        returnList[i] = result[i].count;
        save_i = i;
      }
      asyinc1 = true;
      console.log(returnList);
      console.log("getting data from 0 to" + day);
      pageview
        .find({ month: month, date: { $gte: 0, $lte: day } })
        .exec()
        .then(results => {
          console.log(results);
          let len = results.length;
          for (let i = save_i; i < len; i++) {
            returnList[i] = results[i].count;
          }
          asyinc2 = true;
          console.log(returnList);
          res.send({ result: returnList });
        });
    });
}

module.exports = router;
