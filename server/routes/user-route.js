const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

app.post("/", async (req, res) => {
  try {
    const user = new userModel(req.body);
    let err = user.validateSync();
    if (err) {
      return res.status(400).json({
        err: false,
        resp: 400,
        msg: "Error",
        cont: {
          err,
        },
      });
    }
    const userFind = await userModel.findOne({
      email: user.email,
    });
    if (userFind) {
      return res.status(200).send({
        err: true,
        resp: 200,
        msg: "El correo ya se registro",
      });
    }
    bcrypt.hash(user.pass, 10, (err, hash) => {
      if (err) return res.status(500).send({ err });
      user.pass = hash;
      const newUser = user.save();
      if (newUser.length < 0) {
        return res.status(200).send({
          err: true,
          resp: 200,
          msg: "El usuario no se registro",
        });
      } else {
        return res.status(200).send({
          err: false,
          resp: 200,
          msg: "Usuario registrado",
        });
      }
    });
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

app.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
    userModel.findOne({ email }).then((user) => {
      if (user) {
        bcrypt.compare(pass, user.pass).then((match) => {
          if (match) {
            return res.status(200).send({
              estatus: 200,
              err: false,
              msg: `Bienvenido ${user.name} ${user.firstlastname} ${user.secondlastname}`,
              userData: user,
            });
          } else {
            return res.status(200).send({
              estatus: 200,
              err: true,
              msg: "Correo o contraseña incorrectos.",
            });
          }
        });
      } else {
        return res.status(200).send({
          estatus: 200,
          err: true,
          msg: "Correo o contraseña incorrectos.",
        });
      }
    });
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

app.put("/password", async (req, res) => {
  try {
    const idUser = req.query.idUser;
    const { passAnt, passNew } = req.body;
    userModel.findById(idUser).then((user) => {
      if (user) {
        bcrypt.compare(passAnt, user.pass).then((match) => {
          if (match == true) {
            bcrypt.hash(passNew, 10, (err, hash) => {
              let newPassHash = hash;
              userModel
                .findByIdAndUpdate(
                  { _id: idUser },
                  { $set: { pass: newPassHash } }
                )
                .then((resMongo) => {
                  if (resMongo) {
                    return res.status(200).send({
                      estatus: "200",
                      err: false,
                      msg: "Se cambio la contraseña",
                    });
                  } else {
                    return res.status(500).send({
                      estatus: "500",
                      err: true,
                      msg: "Error",
                    });
                  }
                });
            });
          } else {
            return res.status(200).send({
              estatus: "200",
              err: true,
              msg: "Las contraseñas no coinciden",
            });
          }
        });
      } else {
        return res.status(200).send({
          estatus: "200",
          err: true,
          msg: "El usuario no existe",
        });
      }
    });
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
