const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: {
      required: true,
      trim: true,
      type: String,
      unique: true
    },
    password: {
      required: true,
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre("save", next => {
  if (!this.isModified("password")) {
    // not setting password; skip hashing
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = password => {
  const stored = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, stored, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

const userModel = model("user", userSchema);

module.exports = userModel;
