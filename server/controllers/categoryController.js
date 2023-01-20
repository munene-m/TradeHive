const asyncHandler = require('express-async-handler')
const categoryModel = require('../models/Category')

//create category
const createCategory = asyncHandler( async (req, res) => {
    const Category = new categoryModel(req.body)
    try {
        const saveCategory = await Category.save()
        res.status(200).json(saveCategory)
    } catch (err) {
        res.status(400)
        throw new Error(err.message)        
    }
} )

//update category 
const updateCategory = asyncHandler(async (req, res) => {
    try {
        const updatedCategory = await categoryModel(req.params.id, req.body, {new: true})
        res.status(200).json(updatedCategory)
    } catch (err) {
        res.status(400)
        throw new Error(err.message)
    }
}) 

//delete category
const deleteCategory = asyncHandler( async (req, res) => {
    try {
        const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Category has been deleted successfully")
    } catch(err) {
        throw new Error(err.message)
    }
})

//get categories
const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const Categories = await categoryModel.find()
        res.status(200).json(Categories)
    } catch (err) {
        res.status(400)
        throw new Error(err.message)        
    }
})

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories
}