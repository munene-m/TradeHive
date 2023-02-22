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
    currency: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        // lowercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("ServiceSchema", ServiceSchema)
