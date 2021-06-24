const { response, request } = require("express");
const { Estacionamiento } = require("../models");

const estacionamientosGet = async (req = request, res = response) => {
  const { limite, desde } = req.query;

  const [total, estacionamientos] = await Promise.all([
    Estacionamiento.countDocuments(),
    Estacionamiento.find().limit(Number(limite)).skip(Number(desde)),
  ]);

  res.json({
    total,
    estacionamientos,
  });
};

const crearEstacionamiento = async (req = request, res = response) => {
  const { usuario, estado, ...body } = req.body;

  const data = {
    ...body,
    usuario: req.usuario._id,
  };

  const estacionamiento = new Estacionamiento(data);

  await estacionamiento.save();

  res.status(201).json({
    msg: "Estacionamiento creado con exito",
    estacionamiento,
  });
};

module.exports = {
  estacionamientosGet,
  crearEstacionamiento,
};
