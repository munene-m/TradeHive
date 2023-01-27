const express = require('express')
const router = express.Router()
// const { protect, mpesaProtect } = require('../middleware/authMiddleware')
const { makePayment } = require('../controllers/paymentController')
const { generateToken } = require('../middleware/paymentMiddleware')

router.route("/stk").post(generateToken, makePayment)

module.exports = router