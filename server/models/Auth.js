const mongoose = require("mongoose")

const authSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // unique: true
    },
    category: {
        type: String,
        lowercase: true
    },
    location:{
        type: String
    },
    role: {
        type: String,
        required: true
    },
    rates: {
        type: String,
    },
    workingHours: {
        type: String
    },
    profilePic: {
        type: String,
        default: ""
    }

}, {timeStamps: true})

module.exports = mongoose.model("authSchema", authSchema)