const mongoose = require("mongoose");
const dbName = "Quizapp";
const dbUrl = "mongodb+srv://azam-project1:azam12345@back-end-development.qy3ydsz.mongodb.net/?retryWrites=true&w=majority&appName=Back-End-Development"

const quizDB = async () => {
    try {
        const isconected = await mongoose.connect(
            dbUrl,
            { dbName: dbName }
        )

        isconected && console.log("MongoDB Connected Sucessfully")
    }

    catch (error) {
        console.log(`Something went wrong while connecting database ${error}`)
    }
}

module.exports = quizDB;
