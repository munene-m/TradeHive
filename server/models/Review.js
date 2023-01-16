const mongoose = require("mongoose")

const ReviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth', //referencing the auth model
        required: true
    },
    reviewed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("ReviewSchema", ReviewSchema)
