const axios = require('axios')
const asyncHandler = require('express-async-handler')

//middleware to generate token
const generateToken = asyncHandler(async(req, res, next) => {
    const key = process.env.CONSUMER_KEY
    const secret = process.env.CONSUMER_SECRET
    const auth = new Buffer.from(`${key}:${secret}`).toString("base64")
    await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
        headers: {
            Authorization: `Basic ${auth}`
        }
    }).then((response) => {
        console.log(response.data.access_token)
        req.token = response.data.access_token
        next()
    }).catch((err) => {
        console.log(err);
        // return
        // res.status(400).json(err.message)
    })
})

module.exports = { generateToken }