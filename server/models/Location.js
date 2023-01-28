const mongoose = require("mongoose")

const LocationSchema = mongoose.Schema({
    town: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("LocationSchema", LocationSchema)