const express = require("express");
const router = express.Router();

var dialogflow = require("../dialogflow");

router.post("/bot", (req, res) => {
  let val = req.body.result;
  console.log(val);

  var result = dialogflow.getReply(res, req.body.result);
});

module.exports = router;
