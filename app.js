const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const indexRouter = require("./routes/");

const app = express();

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(helmet());

app.use(express.static("public"));

app.use("/api/v1", indexRouter);

module.exports = app;