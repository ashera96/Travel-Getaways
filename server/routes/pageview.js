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

module.exports = router;
