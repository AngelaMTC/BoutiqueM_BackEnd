const express = require("express");
const app = express();

app.use("/category", require("./category-route"));
app.use("/user", require("./user-route"));
app.use("/type", require('./typeClothe-route'));

module.exports = app;
