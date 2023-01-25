const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { generateToken } = require('../middleware/paymentMiddleware')
const { makePayment } = require('../controllers/paymentController')

router.route("/stk").post(protect, generateToken, makePayment)

module.exports = router