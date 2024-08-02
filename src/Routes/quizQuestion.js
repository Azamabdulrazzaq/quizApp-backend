const express = require("express")
const router = express.Router()
const { quizQuestionHandller, allQuestionsviewhandler, categoryQuestionsIdhandller } = require("../Controller/quizQuestions")


router.post("/add-new/question", quizQuestionHandller)
router.get("/get-all/question", allQuestionsviewhandler)
router.post("/category-related-questions", categoryQuestionsIdhandller)

module.exports = router;