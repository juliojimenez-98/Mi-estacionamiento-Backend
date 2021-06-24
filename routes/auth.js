const { Router } = require("express");
const { login, revalidarToken } = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post("/login", login);
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
