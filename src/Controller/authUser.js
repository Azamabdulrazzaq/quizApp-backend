
const jwt = require("jsonwebtoken");
const AuthModal = require("../Modals/userModals/authUser");


const JWT_SECRET =
    "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";


const userRegisterHandller = async (req, res) => {
    const { name, email, password, contactNum, gender, role } = req.body

    const createdAt = Date.now();
    const visitedHistory = [];
    console.log(req.body)

    //400:

    if (!name || !email || !password || !contactNum || !gender || !role || !createdAt || !visitedHistory) {
        return res.status(400).send({
            status: false,
            message: 'All Feild Are Required'
        })
    }

    //401;
    const checkEmail = await AuthModal.findOne({ email: email });
    if (checkEmail) {
        return res.status(401).send({
            status: false,
            message: "Email Already Exist"
        })
    }

    //200:
    try {
        const encodePassword = btoa(password);
        console.log(encodePassword)

        const newUser = await AuthModal.create({
            name,
            email,
            password: encodePassword,
            contactNum,
            gender,
            role,
            createdAt,
            visitedHistory
        })

        if (newUser) {
            return res.status(200).send({
                status: true,
                message: "User Registered Successfully",
                data: newUser
            })
        }
    }

    catch (error) {
        //500;
        console.log(`Something went wrong while registered in DB: ${error}`);
        return res.status(500).send({
            status: false,
            message: "Something went wrong while registered in DB:"
        })
    }
}

const userLoginHandler = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    // 400 
    if (!email || !password) {
        return res.status(400).send({
            status: false,
            message: "Email And password Required"
        })
    }

    //401;
    const isUserExist = await AuthModal.findOne({ email: email });
    if (!isUserExist) {
        return res.status(401).send({
            status: false,
            message: "Email is already Exist"
        })
    }

    //402:

    const decodePassword = atob(isUserExist.password)
    console.log(decodePassword)
    if (decodePassword != password) {
        return res.status(402).send({
            status: false,
            message: "Invalid password",
        })
    }

    try {
        // this is a current time;
        let currentTime = Date.now();
        const visited = await AuthModal.findOneAndUpdate(
            { _id: isUserExist.id },
            { $push: { visitedHistory: currentTime.toString() } },//date is renter tostring:
            { returnDocument: "after" },// and after update history::
        )

        //200
        //JWT token making
        const token = jwt.sign({ email: isUserExist.email }, JWT_SECRET)
        return res.status(200).send({
            status: true,
            message: "User Logged in Successfully",
            data: visited,
            usertoken: token
        })

    }
    catch (error) {
        //500
        console.log(`Something went wrong while login data from DB : ${error}`);
        return res.status(500).send({
            status: false,
            message: "Something went wrong while login data from DB"
        })
    }
}

module.exports = {
    userRegisterHandller,
    userLoginHandler
}