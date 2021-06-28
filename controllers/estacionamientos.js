const { response, request } = require("express");
const { Estacionamiento } = require("../models");

const estacionamientosGet = async (req = request, res = response) => {
  const { limite, desde } = req.query;
  const query = { estado: true };

  const [total, estacionamientos] = await Promise.all([
    Estacionamiento.countDocuments(query),
    Estacionamiento.find(query).limit(Number(limite)).skip(Number(desde)),
  ]);

  res.json({ estacionamientos, total });
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

const getEstacionamientoById = async (req, res = response) => {
  const { id } = req.params;
  const estacionamiento = await Estacionamiento.findById(id).populate(
    "usuario",
    "nombre"
  );

  res.json(estacionamiento);
};

const actualizarEstacionamiento = async (req, res = response) => {
  const { id } = req.params;

  const { estado, usuario, ...data } = req.body;

  data.usuario = req.usuario._id;

  const estacionamiento = await Estacionamiento.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(estacionamiento);
};

module.exports = {
  estacionamientosGet,
  crearEstacionamiento,
  getEstacionamientoById,
  actualizarEstacionamiento,
};
