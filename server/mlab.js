var Mongoose = require("mongoose");
var dbURI = "mongodb://JFalcon:john2522@ds119476.mlab.com:19476/hidonshabat";
const uri = "mongodb://admin:marper96@ds145369.mlab.com:45369/travelgetaway";
Mangoose.connect(uri, function(err) {
  if (err) {
    console.log("Some problem with the connection " + err);
  } else {
    console.log("The Mongoose connection is ready");
  }
});
module.exports = { Mongoose };
