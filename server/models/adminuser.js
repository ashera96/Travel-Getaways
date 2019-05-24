const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var schema = new Schema({
  email: { type: String, require: true },
  _uname: { type: String, require: true },
  _pwd: { type: String, require: true },
  _status: { type: String, require: true },
  creation_dt: { type: Date, require: true }
});

schema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

schema.methods.isValid = function(hashPassword) {
  return bcrypt.compareSync(hashPassword, this.password);
};

module.exports = mongoose.model("adminuser", schema);
