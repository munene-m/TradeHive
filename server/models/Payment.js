const mongoose = require("mongoose")

const PaymentSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    phone: {
        type: String, // Phone number of the user making the payment
        required: true,
        trim: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId, // Service id of the service that the user wants to pay off
        ref: 'Service',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    transactionCode: {
        type: String, // String field to store the MPESA transaction code taht's generated after user makes payment.
        required: true,
        trim: true
    },
    createdAt: {
        type: Date, //timestamp that stores the date and time the payment was created
        default: Date.now
    }
})

module.exports = mongoose.model("PaymentSchema", PaymentSchema)
