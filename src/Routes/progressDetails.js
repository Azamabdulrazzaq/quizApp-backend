const express = require("express")
const router = express.Router();
const { progressDetailsHandller } = require("../Controller/progressDetails")


router.post("/user/progress", progressDetailsHandller);

module.exports = router