const typeClotheModel = require("../models/typeClotheModel");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  try {
    const typeClothe = await typeClotheModel.find();
    if (typeClothe.length <= 0) {
      res.status(404).send({
        estatus: "404",
        err: true,
      });
    } else {
      res.status(200).send({
        estatus: "200",
        err: false,
        cont: {
          typeClothe,
        },
      });
    }
  } catch (err) {
    return res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const typeClothe = new typeClotheModel(req.body);
    let err = typeClothe.validateSync();
    if (err) {
      return res.status(400).json({
        estatus: false,
        resp: 400,
        cont: {
          err,
        },
      });
    }
    const newTypeClothe = await typeClothe.save();
    if (newTypeClothe.length <= 0) {
      res.status(400).send({
        estatus: "400",
        err: true,
      });
    } else {
      res.status(200).send({
        estatus: "200",
        err: false,
        msg: "Success: Information inserted correctly.",
        cont: {
          newTypeClothe,
        },
      });
    }
  } catch (err) {
    return res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

module.exports = app;
