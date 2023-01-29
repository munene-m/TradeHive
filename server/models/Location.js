const mongoose = require("mongoose")

const LocationSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth', //referencing the auth model
        required: true
    },
})

module.exports = mongoose.model("LocationSchema", LocationSchema)