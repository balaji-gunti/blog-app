const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const routes = require("./routes/v1");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/v1", routes);

module.exports = app;
