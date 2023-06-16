const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const config = require("./config");
const { port } = config.app;
const api = require("./api");

app.use(express.json());
app.use(cors());
app.use(express.static("Public"));
app.use("/", api);

app.listen(port, () => {
  console.log("server is up on port " + port);
});
