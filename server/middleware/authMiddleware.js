const asyncHandler = require('express-async-handler')
const authModel = require('../models/Auth')
const jwt = require('jsonwebtoken')
const consumerSecret = process.env.CONSUMER_SECRET
const consumerKey = process.env.CONSUMER_KEY
const axios = require('axios')

const protect = asyncHandler( async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await authModel.findById(decoded.id).select('-password')

        next()
    } else {
        res.status(401)
        throw new Error("Unauthorized attempt")
    }
    if(!token){
        res.status(401)
        throw new Error("No authorization without token")
    }

    const auth = new Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")
    await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
            headers: {
                Authorization: `Basic ${auth}`
            },
        }
    ).then((response) => {
        console.log(response.data.access_token)
        const authToken = response.data.access_token
        req.token = authToken
        next()
    }).catch((error) =>{
        console.log(error)
        res.status(400).json(error.message)
    }) 

})

module.exports = { protect }