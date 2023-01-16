const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("CategorySchema", CategorySchema)
