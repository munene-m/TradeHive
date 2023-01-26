const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { makePayment } = require('../controllers/paymentController')
// const { generateToken } = require('../middleware/paymentMiddleware')

router.route("/stk").post(protect, makePayment)

module.exports = router