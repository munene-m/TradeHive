const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authModel = require("../models/Auth")

//Register user
const registerUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body

    if (!firstname || !lastname || !email || !password) {
        res.status(400)
        throw new Error("Please enter all the required fields")
    }
    const userExists = await authModel.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error("User already exists!")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
  
    const user = await authModel.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
    })

    if(user) {
        res.status(201)
        res.json({
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

//Log in user
const loginUser = asyncHandler( async(req,res) => {
    const { email, password } = req.body

    if( !email || !password ) {
        res.status(400)
        throw new Error("Please enter all the required fields")
    }

    const user = await authModel.findOne({ email })

    if( user && await bcrypt.compare(password, user.password) ){
        const { password, ...others } = user._doc
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie("token", token, { httpOnly: true }).status(200).json(others)
    } else {
        res.status(400)
        throw new Error ("The credentials you entered are invalid")
    }
} )

const getCredentials = asyncHandler (async (req, res) =>{
    res.status(200).json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { 
        expiresIn: '1d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getCredentials
}