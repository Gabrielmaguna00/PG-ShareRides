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
    let usuario = await Usuario.findByPk(email);
    if (usuario) res.send(usuario);
    else res.send("error");
  } catch (err) {
    next(err);
  }
});

router.post("/registro", async (req, res, next) => {
  try {
    const { email, nombre, apellido, password, avatar } = req.body;
    let nuevoUsuario;
    nuevoUsuario = await Usuario.findOrCreate({
      where: { email, nombre, apellido, password, avatar },
    });
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
    let usuario = await Usuario.findByPk(email);
    usuario.update({ logueado: true });
    usuario.save();
    res.send("usuario logueado");
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
    res.send("usuario deslogueado");
  } catch (err) {
    next(err);
  }
});

router.put("/modificarperfil", async (req, res, next) => {
  const { email, acercaDeMi, telefono, avatar, dni } = req.body;
  try {
    let usuario = await Usuario.findByPk(email);
    if (dni) {
      console.log("entre a dni");
      usuario.update({
        dni: dni,
      });
      usuario.save();
    }
    if (telefono) {
      console.log("entre a telefono");
      usuario.update({
        telefono: telefono,
      });
      usuario.save();
    }
    if (avatar) {
      usuario.update({
        avatar: avatar,
      });
      usuario.save();
    }
    if (acercaDeMi) {
      usuario.update({
        acercaDeMi: acercaDeMi,
      });
      usuario.save();
    } else {
      usuario.update({
        acercaDeMi: acercaDeMi,
        telefono: telefono,
        avatar: avatar,
        dni: dni,
      });
      usuario.save();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
