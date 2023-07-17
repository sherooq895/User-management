const express = require("express");
const router = express.Router();
const { verifyJwt } = require("../../middleware/jwtauth");


const {
    login,
    createuser,
    authenticationJwt,
    showusers,
    deleteuser,
    edituser,
    searchuser
 } = require("../../controllers/adiminControllers");


router.post("/login", login);
router.get("/authentication", verifyJwt, authenticationJwt);
router.post("/createuser", verifyJwt, createuser)
router.get("/showuser", verifyJwt, showusers)
router.post("/deleteuser", verifyJwt, deleteuser)
router.post("/editUser", verifyJwt, edituser)
router.post("/searchemail", verifyJwt, searchuser)




module.exports = router;