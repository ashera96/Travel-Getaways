const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("./util/db");

const app = express();

app.set("port", +process.env.PORT || 3000);

// non-functional middleware stack
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// bootstrap the application
const start = async () => {
  try {
    await connect();
    app.listen(app.get("port"), () => {
      console.log("Server is started on http://localhost:%d", app.get("port"));
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = { start };
