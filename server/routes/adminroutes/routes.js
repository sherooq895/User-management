const express = require("express");
const router = express.Router();
const { verifyJwt } = require("../../middleware/jwtauth");


const {
    login,
 } = require("../../controllers/adiminControllers");


router.post("/login", login);



module.exports = router;