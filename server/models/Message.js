const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    }, 
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("MessageSchema", MessageSchema)
