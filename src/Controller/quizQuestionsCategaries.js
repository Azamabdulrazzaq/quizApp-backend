const CategoryModal = require("../Modals/userModals/quizQuestionsCategeries");

const categoryAddhandller = async (req, res) => {
    const { category_name } = req.body;
    console.log(req.body);


    //400:
    if (!category_name) {
        return res.status(400).send({
            status: false,
            message: "Category Name Is Invalid"
        })
    }

    //401
    const isCheckCategory = await CategoryModal.findOne({ category_name })
    if (isCheckCategory) {
        return res.status(401).send({
            status: false,
            message: "Category is already exist"
        })
    }
    //200
    try {
        const categoryResult = await CategoryModal.create({
            category_name,
        })
        console.log(categoryResult)

        if (categoryResult) {
            return res.status(200).send({
                status: true,
                message: "Category name added Successfully",
                data: categoryResult
            })
        }
    }

    catch (error) {
        console.log('Something went wrong while fetching data from DB', error)
    }

}
const categoryShowHandller = async (req, res) => {

    try {

        const result = await CategoryModal.find()
        if (result) {
            return res.status(200).send({
                status: true,
                message: "Category name Show successfully",
                data: result
            })
        }

    }

    catch (error) {
        console.log(`Something went wrong while fetching category name DB: ${error}`)
    }

}


module.exports = {
    categoryAddhandller,
    categoryShowHandller
};