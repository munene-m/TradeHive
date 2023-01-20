const express = require('express')
const router = express.Router()
const { createCategory, updateCategory, deleteCategory, getAllCategories } = require('../controllers/categoryController')
router.route("/").get(getAllCategories)
router.route("/create").post(createCategory)
router.route("/update/:id").put(updateCategory)
router.route("/delete/:id").delete(deleteCategory)

module.exports = router