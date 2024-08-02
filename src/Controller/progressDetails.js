
const mongoose = require("mongoose");
const ProgressModal = require("../Modals/userModals/progressDetails");
const AuthModal = require("../Modals/userModals/authUser");

const progressDetailsHandller = async (req, res) => {
    const { user_id, attemted_questions, score_secured, time_spend, status } = req.body;
    const createdAt = Date.now();

    try {
        //400:
        if (!user_id ||
            !attemted_questions ||
            !score_secured ||
            !time_spend ||
            !status ||
            !createdAt
        ) {
            return res.status(400).send({
                status: false,
                message: "All feild are required"
            })
        }

        //401:
        const isValidId = await AuthModal.findOne({ _id: user_id })
        if (!isValidId) {
            return res.status(401).send({
                status: false,
                message: "User Id Is not valid"
            })
        }

        try {
            //200:
            const progressResult = await ProgressModal.create({
                user_id,
                attemted_questions,
                score_secured,
                time_spend,
                status,
                createdAt,
            })
            if (progressResult) {
                return res.status(200).send({
                    status: true,
                    message: "Progress details Updated",
                    data: progressResult,
                })
            }
        }

        catch (error) {
            console.log(`progress details error in node js: ${error}`)
        }

    }

    catch (error) {
        //500:
        console.log(`Something while progress data from database DB: ${error}`)
        return res.status(500).send({
            status: false,
            message: "Something while progress data from database DB"
        })
    }
}

module.exports = {
    progressDetailsHandller
}