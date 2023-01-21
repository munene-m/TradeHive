const reviewModel = require('../models/Review')
const authModel = require('../models/Auth')
const asyncHandler = require('express-async-handler')

//create a review
const createReview = asyncHandler( async (req, res) => {
    const { description, rating, reviewer, reviewed } = req.body
    if(!description || !rating || !reviewer || !reviewed) {
        res.status(400)
        throw new Error("Please enter all required fields")
    }
    const review = await reviewModel.create({
        description, rating, reviewer, reviewed, user: req.user.id
    })
    if(review) {
        res.status(200).json({
            _id: review.id,
            description: review.description,
            rating: review.rating,
            reviewer: review.reviewer,
            reviewed: review.reviewed
        })
    } else {
        res.status(400)
        throw new Error()
    }
})

//update review
const updateReview = asyncHandler( async (req, res) => {
    const review = await reviewModel.findById(req.params.id)
    if(!review){ 
        res.status(400)
        throw new Error("Review not found")
    }
    const user = await authModel.findById(req.user.id)
    
    if(!user) {
        res.status(404)
        throw new Error("User not found");
    }

    const updatedReview = await reviewModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedReview)
})

//delete review
const deleteReview = asyncHandler( async( req, res ) => {
    const review = await reviewModel.findById(req.params.id)
    if(!review) {
        res.status(404)
        throw new Error("Review not found ")
    }

    const user = await authModel.findById(req.user.id)

    if(!user) {
        res.status(404)
        throw new Error("User not found")
    }

    await review.remove()
    res.status(200).json({ id: req.params.id })
});

module.exports = {
    createReview, updateReview, deleteReview
}