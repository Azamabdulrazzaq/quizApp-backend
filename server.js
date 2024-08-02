const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const quizDB = require("./src/Database/quizDB")
const jwt = require("jsonwebtoken");
const authRouter = require("./src/Routes/authUser")
const progressRouter = require("./src/Routes/progressDetails");
const categoryRouter = require("./src/Routes/quizQuestionCategeries");
const questionsRouter = require("./src/Routes/quizQuestion");
const AuthModal = require("./src/Modals/userModals/authUser");

// Static Variables!
const app = express();
const port = 8080;
const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"

// Express MiddleWares!
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


// All Screens Routes !
app.use("/quiz", authRouter);
app.use("/quiz", progressRouter);
app.use("/quiz", categoryRouter)
app.use("/quiz", questionsRouter)


//Note MongoDb connected here!
// const dbUrl = "mongodb+srv://azam-project1:azam12345@back-end-development.qy3ydsz.mongodb.net/?retryWrites=true&w=majority&appName=Back-End-Development"
quizDB();

// Note this functionality for sign up user from data base method Post!

app.get('/', (req, res) => {
    return res.json("Hey Hurray!");

})

// app.post("/userdata", async (req, res) => {
//     const { token } = req.body;
//     try {
//         const user = jwt.verify(token, JWT_SECRET);
//         console.log(user)
//         const useremail = user.email
//         AuthModal.findOne({ email: useremail }).then((data) => {
//             if (data) {
//                 return res.status(200).send({
//                     status: true,
//                     message: "User Verify Successfully",
//                     data: data
//                 })
//             }
//             else {
//                 return res.status(401).send({
//                     status: false,
//                     message: "user not found"
//                 })
//             }
//         })
//     }
//     catch (error) {
//         return res.status(500).send({
//             status: false,
//             message: "Database Error"
//         });
//     }
// });



//user Data Route;
app.post("/user/varify", async (req, res) => {
    const { token } = req.body

    if (!token) {
        return res.status(400).send({
            status: false,
            message: "Token Is Required"
        })
    }

    try {

        const user = jwt.verify(token, JWT_SECRET)
        const useremail = user.email

        if (!useremail) {
            return res.status(400).send({
                status: false,
                message: "Token does not contain email"
            })
        }

        const userDataVarify = await AuthModal.findOne({ email: useremail })

        if (userDataVarify) {
            return res.status(200).send({
                status: true,
                message: "Email Varify Succesfully"
            })
        }
        else {
            return res.status(401).send({
                status: false,
                message: "User Not Found"
            })
        }

    }

    catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send({
                status: false,
                message: "Invalid Token"
            })
        }
    }
    return res.status(500).send({
        status: false,
        message: "Something went wrong"
    })
})


// Note Server Run...!
app.listen(
    port,
    () => {
        console.log(`Server is running on http://localhost:${port}`);
    }
);