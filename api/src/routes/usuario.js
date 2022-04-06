const { Router } = require("express");
const router = Router();
const { Usuario, Viaje } = require("../db.js");

router.get("/iniciarsesion/:email/:password", async (req, res, next) => {
  try {
    const { email, password } = req.params;
    //console.log("soy email" , email);
    if (email) {
      var dbUsuario = await Usuario.findOne(
        { where: { email: email } },
        { include: Viaje }
      );
      //console.log("soy db usuario", dbUsuario);
      if (dbUsuario) {
        dbUsuario.password === password
          ? res.send("ok")
          : res.send("contraseña incorrecta");
      } else res.send("usuario no encontrado");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/usuarios", async (req, res, next) => {
  try {
    let usuarios = await Usuario.findAll();
    res.send(usuarios);
  } catch (err) {
    next(err);
  }
});

router.get("/usuarios/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
<<<<<<< HEAD
    let usuarioEncontrado = await Usuario.findByPk(email);
    console.log(usuarioEncontrado.dataValues);
    res.send(usuarioEncontrado);
=======
    let usuario = await Usuario.findByPk(email);
    res.send(usuario);
>>>>>>> develop
  } catch (err) {
    next(err);
  }
});

router.post("/registro", async (req, res, next) => {
  try {
    const { email, nombre, apellido, password, vehiculo } = req.body;
    let nuevoUsuario;
    if (vehiculo) {
      nuevoUsuario = await Usuario.findOrCreate({
<<<<<<< HEAD
        where: { email, nombre, apellido, password, vehiculo }, //vehiculo = patente del auto
      });
    } else {
      nuevoUsuario = await Usuario.findOrCreate({
        where: { email, nombre, apellido, password },
=======
        where: { email, nombre, apellido, password, vehiculo } //vehiculo = patente del auto
      });
    } else {
      nuevoUsuario = await Usuario.findOrCreate({
        where: { email, nombre, apellido, password }
>>>>>>> develop
      });
    }
    res.json(nuevoUsuario);
  } catch (err) {
    next(err);
  }
});

router.put("/cambiopassword", async (req, res, next) => {
  const { password, email } = req.body;
  try {
    let usuario = await Usuario.findByPk(email);
    usuario.update({ password: password });
    usuario.save();
    res.send("contraseña cambiada");
  } catch (err) {
    next(err);
  }
});

router.put("/logueado", async (req, res, next) => {
  const { email } = req.body;
  try {
<<<<<<< HEAD
    let usuario = await Usuario.findByPk(email);
    console.log(usuario);
    usuario.update({ logueado: true });
    usuario.save();
=======
    let usuario = await Usuario.findByPk(email);
    usuario.update({ logueado: true });
    usuario.save();
    res.send("usuario logueado")
  } catch (err) {
    next(err);
  }
});

router.put("/deslogueado", async (req, res, next) => {
  const { email } = req.body;
  try {
    let usuario = await Usuario.findByPk(email);
    usuario.update({ logueado: false });
    usuario.save();
    res.send("usuario deslogueado")
>>>>>>> develop
  } catch (err) {
    next(err);
  }
});

module.exports = router;
