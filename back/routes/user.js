//requires
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

//routes de création et de connexion utilisateur
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

//exportation du router user
module.exports = router;
