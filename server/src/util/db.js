const mongoose = require("mongoose");

// a more concise and easier wrapper for mongoose connect
const connect = (uri, opts) => {
  uri = uri || process.env.MONGO_URI;
  if (!uri) {
    // MONGO_URI is not defined; unable to move forward
    console.error(`[${new Date()}] - Mongo URI is missing; exiting...`);
    process.exit(1);
  }

  opts = opts || {};

  return mongoose.connect(uri, { ...opts, useNewUrlParser: true });
};

module.exports = { connect };
