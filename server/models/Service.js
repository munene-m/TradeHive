const mongoose = require("mongoose")

const ServiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //to remove any leading and trailing whitespaces from the string values before saving to DB
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    duration: {
        type: String,
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth', //referencing the auth model
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("ServiceSchema", ServiceSchema)
