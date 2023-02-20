const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createService, updateService, deleteService, getServiceInCategory, getAllServices, getService } = require('../controllers/serviceController')
router.route("/").get( getAllServices)
router.route("/:id").get(getService)
router.route("/create").post(protect, createService)
router.route("/update/:id").put(protect, updateService)
router.route("/delete/:id").delete(protect, deleteService)
router.route("/service/:value").get(getServiceInCategory)
// router.route("/myServices/:userId").get(protect, getAllServices)

module.exports = router