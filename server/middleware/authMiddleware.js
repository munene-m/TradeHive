const asyncHandler = require('express-async-handler')
const authModel = require('../controllers/authController.js')
const jwt = require('jsonwebtoken')

const protect = asyncHandler( async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer", "")
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await authModel.findOne({_id: decoded._id, "tokens.token": token})
    
        if(!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).json({ error: "PLease authenticate."})    
    }
})

module.exports = { protect }