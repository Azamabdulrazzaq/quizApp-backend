const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema(
    {
        quiz_title: { type: String, required: true },
        question: { type: String, required: true },
        Option: { type: [String], required: true },
        image: { type: String, required: true },
        question_marks: { type: String, required: true },
        total_questions: { type: String, require: true },
        is_correct: { type: [Boolean], required: true },
        category_id: { type: String, required: true },
        createdAt: {
            type: Date,
            default: Date.now()
        }

    },
    {
        collection: "quiz-questions"
    }
)

// Create a model
const QuestionModal = mongoose.model('quiz-questions', questionSchema);
module.exports = QuestionModal;


