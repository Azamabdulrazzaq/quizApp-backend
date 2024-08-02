const express = require("express");
const router = express.Router();
const { categoryAddhandller, categoryShowHandller } = require("../Controller/quizQuestionsCategaries")


router.post("/add/categoryname", categoryAddhandller);
router.get("/get/categoryShow", categoryShowHandller)

module.exports = router