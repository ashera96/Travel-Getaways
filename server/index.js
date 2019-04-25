var express = require("express");
const MongoClient = require("mongodb");
var app = express();

const uri =
  "mongodb+srv://admin:marper96@cluster0-dtohb.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.post("/GetUsers", function(_req, res) {
  MongoClient.connect(uri, { useNewUrlParser: true }, (_err, database) => {
    const myAwesomeDB = database.db("travelGetaway");
    var users = myAwesomeDB.collection("users");
    users.find({}, (err, _result) => {
      if (err) throw err;

      res.send(_result);
    });
  });
});
app.listen(3000, function() {
  console.log("server listning on port 3000");
});
