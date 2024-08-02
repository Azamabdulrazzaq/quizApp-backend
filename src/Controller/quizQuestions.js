const mongoose = require("mongoose");
const QuestionModal = require("../Modals/userModals/quiz-Question");
const AuthModals = require("../Modals/userModals/authUser");


const quizQuestionHandller = async (req, res) => {
    const { quiz_title, question, Option, image, question_marks, total_questions, is_correct, category_id } = req.body
    const createdAt = Date.now();

    //400:
    if (
        !quiz_title ||
        !question ||
        !Option ||
        !image ||
        !question_marks ||
        !total_questions ||
        !is_correct ||
        !category_id ||
        !createdAt
    ) {
        return res.status(400).send({
            status: false,
            message: "All feilds Are Requied"
        })

    }

    try {
        const finalResult = await QuestionModal.create({
            quiz_title,
            question,
            Option,
            image,
            question_marks,
            total_questions,
            is_correct,
            category_id,
            createdAt
        })
        console.log(finalResult)

        return res.status(200).send({
            status: true,
            message: "Question Added Successfully",
            data: finalResult
        })
    }

    catch (error) {
        //500;
        console.log(`Something went wrong while fetching all questions from DB: ${error}`)
        return res.status(500).send({
            status: false,
            message: "Something went wrong while fetching all questions from DB"
        })
    }
}

const allQuestionsviewhandler = async (req, res) => {
    try {
        const getAllQuestions = await QuestionModal.find();
        return res.status(200).send({
            status: true,
            message: "Get All Questions Successfully",
            data: getAllQuestions
        })
    }

    catch (error) {
        console.log(`Something went wrong while fetch all Questions ${error}`)
    }
}

const categoryQuestionsIdhandller = async (req, res) => {

    try {
        const { category_id } = req.body;
        //400:
        if (!category_id) {
            return res.status(400).send({
                status: false,
                message: "Invalid Category id"
            })
        }
        //401
        const isvalidID = await QuestionModal.findOne({ category_id })
        if (!isvalidID) {
            return res.status(401).send({
                status: false,
                message: "category id is not exist"
            })
        }
        //200:

        const resultId = await QuestionModal.find({ category_id });
        if (resultId) {
            return res.status(200).send({
                status: true,
                message: "get category related question",
                data: resultId
            })
        }

    }

    catch (error) {
        console.log("Something went wrong while feching data", error)
    }

}

module.exports =
{
    quizQuestionHandller,
    allQuestionsviewhandler,
    categoryQuestionsIdhandller
};