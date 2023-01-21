const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createReview, updateReview, deleteReview } = require('../controllers/reviewController')

router.route('/create').post(protect, createReview)
router.route('/update/:id').put(protect, updateReview)
router.route('/delete/:id').delete(protect, deleteReview)

module.exports = router