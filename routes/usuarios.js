const { Router } = require("express");
const { check } = require("express-validator");

const { usuariosGet, usuariosPost } = require("../controllers/usuarios");
const { isRoleValid, emailExists } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("password", "la contrasena debe ser de 6 caracteres o mas").isLength({
      min: 6,
    }),
    // check("role", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValid),
    check("correo").custom(emailExists),
    validarCampos,
  ],
  usuariosPost
);

module.exports = router;
