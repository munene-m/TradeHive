const paymentModel = require('../models/Payment')
const asyncHandler = require('express-async-handler')
const axios = require('axios')

const shortcode = process.env.MPESA_PAYBILL
const passkey = process.env.MPESA_PASSKEY



const makePayment = asyncHandler( async (req, res) => {

    const phone = req.body.phone.substring(1)
    const amount = req.body.amount
    let token = req.token
    const date = new Date()
    const timestamp = date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2)

    const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")

    await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {
            "BusinessShortCode": shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": `254${phone}`,
            "PartyB": shortcode,
            "PhoneNumber": `254${phone}`,
            "CallBackURL": "https://5532-41-90-187-218.in.ngrok.io/payment/stk",
            "AccountReference": `254${phone}`,
            "TransactionDesc": "Test"
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    ).then((data) => {
        console.log(data)
        res.status(200).json(data)
    })
    .catch((err) => {
        console.log(err)
        res.status(err.response.status).json(err.message)
    })
    //     const payment = await paymentModel.create({
    //         amount,
    //         phone,
    //     })
    //     if (payment) {
    //     return res.status(200).json({
    //         _id: payment.id,
    //         phone: payment.phone,
    //         status: payment.status,
    //         transactionId: payment.transactionId
    //     })
    // }

})



module.exports = { makePayment }