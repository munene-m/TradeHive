const axios = require('axios')
const asyncHandler = require('express-async-handler')

const generateToken = asyncHandler(async (req, res, next) => {
    const consumerSecret = process.env.CONSUMER_SECRET
    const consumerKey = process.env.CONSUMER_KEY

    const auth = new Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")
    await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
            headers: {
                Authorization: `Basic ${auth}`
            },
        }
    ).then((response) => {
        console.log(response.data.access_token)
        next()
    }).catch((error) =>{
        console.log(error)
        res.status(400).json(error.message)
    })

}
)

module.exports = {
    generateToken
}