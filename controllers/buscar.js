const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Estacionamiento } = require("../models");

const coleccionesExistentes = [
  "estacionamientos",
  "mis-estacionamientos",
  "role",
  "usuarios",
];

const buscarUsuarios = async (termino = "", res = response) => {
  const isMongoID = ObjectId.isValid(termino);

  if (isMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarEstacionamientos = async (termino = "", res = response) => {
  const isMongoID = ObjectId.isValid(termino);

  if (isMongoID) {
    const estacionamiento = await Estacionamiento.findById(termino);
    return res.json({
      results: estacionamiento ? [estacionamiento] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const estacionamientos = await Estacionamiento.find({
    $or: [{ titulo: regex }, { comuna: regex }],
  });

  res.json({
    results: estacionamientos,
  });
};

const buscarMisEstacionamientos = async (termino = "", res = response) => {
  const isMongoIDUser = ObjectId.isValid(termino);

  if (isMongoIDUser) {
    const estacionamiento = await Estacionamiento.find({
      usuario: ObjectId(termino),
    });
    return res.json({
      results: estacionamiento ? [estacionamiento] : [],
    });
  }
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;
  if (!coleccionesExistentes.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesExistentes}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "estacionamientos":
      buscarEstacionamientos(termino, res);
      break;

    case "mis-estacionamientos":
      buscarMisEstacionamientos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "No hizo la busqueda de coleccion",
      });
      break;
  }
};
module.exports = {
  buscar,
};
