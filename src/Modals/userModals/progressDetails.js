
const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        attemted_questions: { type: String, required: true },
        score_secured: { type: String, required: true },
        time_spend: { type: String, required: true },
        status: { type: String, required: true },
        createdAt: { type: String, required: true }
    },
    {
        collection: "progress-details"
    },
)

const ProgressModal = mongoose.model("progress-details", progressSchema)

module.exports = ProgressModal