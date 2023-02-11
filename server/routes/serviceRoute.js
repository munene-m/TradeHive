const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createService, updateService, deleteService, getService, getAllServices } = require('../controllers/serviceController')
router.route("/").get( getAllServices)
router.route("/create").post(protect, createService)
router.route("/update/:id").put(protect, updateService)
router.route("/delete/:id").delete(protect, deleteService)
router.route("/service/:value").get(getService)
// router.route("/myServices/:userId").get(protect, getAllServices)

module.exports = router