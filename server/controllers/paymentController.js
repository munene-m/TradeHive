const paymentModel = require('../models/Payment')
const asyncHandler = require('express-async-handler')
const axios = require('axios')

const endpoint = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
const shortcode = process.env.MPESA_PAYBILL
const passkey = process.env.MPESA_PASSKEY


const makePayment = asyncHandler(async (req, res) => {
    try {
        const phone = req.body.phone.substring(1)
        const amount = req.body.amount
        let auth = `Bearer ${req.token}`

        const date = new Date()
        const timestamp = date.getFullYear() +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2)

        const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")

        // const token = new Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")


        //create the payment request payload
        const payload = {
            "BusinessShortCode": shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone,
            "PartyB": shortcode,
            "PhoneNumber": `254${phone}`,
            "CallBackURL": "https://mydomain.com/path",
            "AccountReference": `254${phone}`,
            "TransactionDesc": "testing"
        }
        const headers = {
            "Content-Type": "application/json",
            "Authorization": auth
        }

        const { data } = await axios.post(endpoint, payload, { headers })

        //create a new payment in the database
        const payment = new paymentModel.create({
            amount,
            phone,
            user: req.user.id,
            status: data.ResponseCode,
            transactionId: data.MerchantRequestID
        })
        if (payment) {
            res.status(200).json({
                _id: payment.id,
                phone: payment.phone,
                user: payment.user,
                status: payment.status,
                transactionId: payment.transactionId
            })
        }
        res.json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})



module.exports = { makePayment }