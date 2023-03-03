const mongoose = require("mongoose")

const ReviewSchema = mongoose.Schema({
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
        type: String,
        required: true
    },
    reviewed: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("ReviewSchema", ReviewSchema)
