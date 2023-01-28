const mongoose = require("mongoose")

const PaymentSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    phone: {
        type: String, 
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("PaymentSchema", PaymentSchema)
