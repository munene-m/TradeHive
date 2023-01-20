const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createService, updateService, deleteService, getService, getAllServices } = require('../controllers/serviceController')
router.route("/:userId").get(protect, getAllServices)
router.route("/create").post(createService)
router.route("/update/:id").put(protect, updateService)
router.route("/delete/:userId/:id").delete(protect, deleteService)
router.route("/service/:userId/:id").get(protect, getService)
// router.route("/myServices/:userId").get(protect, getAllServices)

module.exports = router