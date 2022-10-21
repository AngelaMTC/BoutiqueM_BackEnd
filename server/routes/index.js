const express = require("express");
const app = express();

app.use("/category", require("./category-route"));
app.use("/user", require("./user-route"));

module.exports = app;
