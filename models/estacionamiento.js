const { Schema, model } = require("mongoose");

const EstacionamientoSchema = Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  latitud: {
    type: Number,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  comuna: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
});

EstacionamientoSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Estacionamiento", EstacionamientoSchema);
