const mongoose = require("mongoose")

const authSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    // isClient:{
    //     type: Boolean,
    //     default: false
    // },
    // isFreelancer:{
    //     type: Boolean,
    //     default: false
    // },
    profilePic: {
        type: String,
        default: ""
    }

}, {timeStamps: true})

module.exports = mongoose.model("authSchema", authSchema)