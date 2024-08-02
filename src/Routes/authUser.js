const express = require("express")
const router = express.Router();
const { userRegisterHandller, userLoginHandler } = require("../Controller/authUser")

// Routes!
router.post("/signup", userRegisterHandller)
router.post("/login", userLoginHandler)

module.exports = router