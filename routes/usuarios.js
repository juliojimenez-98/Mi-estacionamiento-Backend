const { Router } = require("express");
const { check } = require("express-validator");
// const {
//   isRoleValid,
//   emailExists,
//   existsUserById,
// } = require("../helpers/db-validators");

// const {
//   validarCampos,
//   validarJWT,
//   isAdminRole,
//   tieneRole,
// } = require("../middlewares");

const { usuariosGet, usuariosPost } = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.post("/", usuariosPost);

module.exports = router;
