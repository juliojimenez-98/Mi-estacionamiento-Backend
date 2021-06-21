const { response, request } = require("express");

const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite, desde } = req.query;

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(),
    Usuario.find().limit(Number(limite)).skip(Number(desde)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, comuna, direccion, apellido, role } = req.body;

  const usuario = new Usuario({ nombre, correo, password,comuna, direccion, apellido, role });

  //Encriptar contrasena
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.json({
    msg: "Se creo correctamente el usuario",
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
};
