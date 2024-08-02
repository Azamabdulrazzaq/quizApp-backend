
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        category_name: { type: String, required: true }
    },
    {
        collection: "category-name"
    },
)

const CategoryModal = mongoose.model("category-name", categorySchema)

module.exports = CategoryModal