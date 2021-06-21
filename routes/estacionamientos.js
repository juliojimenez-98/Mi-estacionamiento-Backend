const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearEstacionamiento,
  estacionamientosGet,
} = require("../controllers/estacionamientos");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", estacionamientosGet);

router.post(
  "/",
  [
    validarJWT,
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("direccion", "La direccion es obligatoria").not().isEmpty(),
    check("latitud", "La latitud no se esta agregando error interno")
      .not()
      .isEmpty(),
    check("longitud", "La longitud no se esta agregando error interno")
      .not()
      .isEmpty(),
    check("comuna", "La comuna es obligatioria").not().isEmpty(),
    validarCampos,
  ],
  crearEstacionamiento
);

module.exports = router;
