const clotheModel = require("../models/clothesModel");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const clothes = await clotheModel.aggregate([
    {
      $lookup: {
        from: "namecategories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "typeclothes",
        localField: "type",
        foreignField: "_id",
        as: "type",
      },
    },
  ]);
  if (clothes.length <= 0) {
    res.status(404).send({
      estatus: "404",
      err: true,
    });
  } else {
    res.status(200).send({
      estatus: "200",
      err: false,
      clothes,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const clothe = new clotheModel(req.body);
    let err = clothe.validateSync();
    if (err) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error",
        cont: {
          err,
        },
      });
    }
    const clotheFind = await clotheModel.findOne({
      name: { $regex: `${clothe.name}$`, $options: "i" },
    });
    if (clotheFind) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        cont: clotheFind.name,
      });
    }
    const newClothe = await clothe.save();
    if (newClothe.length <= 0) {
      res.status(400).send({
        estatus: "400",
        err: true,
      });
    } else {
      res.status(200).send({
        estatus: "200",
        err: false,
        newClothe,
      });
    }
  } catch (err) {
    res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

app.put("/", async (req, res) => {
  try {
    const idClothe = req.query.idClothe;
    if (req.query.idClothe == "") {
      return res.status(400).send({
        estatus: "400",
        err: true,
        
      });
    }
    req.body._id = idClothe;
    const clotheFind = await clotheModel.findById(idClothe);
    if (!clotheFind) {
      return res.status(404).send({
        estatus: "404",
        err: true,
        msg: "Error: The user was not found in the database.",
        cont: clotheFind,
      });
    }
    const newClotheInfo = new clotheModel(req.body);
    let err = newClotheInfo.validateSync();
    if (err) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error: Error inserting user.",
        cont: {
          err,
        },
      });
    }
    const clotheUpdate = await clotheModel.findByIdAndUpdate(
      idClothe,
      { $set: newClotheInfo },
      { new: true }
    );
    if (!clotheUpdate) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error: Trying to update the user.",
        cont: 0,
      });
    } else {
      return res.status(200).json({
        ok: true,
        resp: 200,
        msg: "Success: The user was updated successfully.",
        cont: {
          newClotheInfo,
        },
      });
    }
  } catch (err) {
    res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error: Error updating user.",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

module.exports = app;
