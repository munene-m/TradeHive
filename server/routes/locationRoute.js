const express = require('express')
const router = express.Router()
const { createLocation } = require('../controllers/locationController')
const { protect } = require('../middleware/authMiddleware')

router.route('/create').post(protect, createLocation)