
const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
    {
        quiz_Id: String,
        quiz_Title: String,
        quiz_Time: String, // 20 minutes
        quiz_Questions: [
            {
                question: String,
                options: [String, String, String, String],
                answer: String
            }
        ],
        number_Of_Questions: String, // 10 Questions
        passing_Marks: String,
        total_Score: String, // 50 marks
    },

    {
        collection: "new-quizquestions"
    },
)

const newQuizQuestion = mongoose.model("new-quizquestions", quizQuestionSchema)
module.exports = newQuizQuestion