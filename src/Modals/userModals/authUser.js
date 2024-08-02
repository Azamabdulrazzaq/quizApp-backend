const mongoose = require("mongoose");

const userSchemas = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        contactNum: { type: String, required: true },
        gender: { type: String, required: true },
        role: { type: String, required: true },
        chreatedAt: { type: Date, default: Date.now },
        visitedHistory: { type: [String], default: [] }

    },
    {
        collection: "user-details"
    }
)

const AuthModal = mongoose.model("user-details", userSchemas)

module.exports = AuthModal;