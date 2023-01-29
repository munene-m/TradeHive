const locationModel = require('../models/Location')
const asyncHandler = require('express-async-handler')

//create location
const createLocation = asyncHandler(async (req, res) => {
    const {location, county, freelancer} = req.body
    if(!location || !county || !freelancer) {
        res.status(400)
        throw new Error("Please enter all required fields")
    }
    const freelancerLocation = await locationModel.create({
        location, county, freelancer, user: req.user.id
    })
    if(freelancerLocation){
        res.status(200).json({
            _id: freelancerLocation.id,
            location: freelancerLocation.location,
            county: freelancerLocation.county,
            freelancer: freelancerLocation.freelancer
        })
    } else {
        res.status(400)
        throw new Error()
    }
})

module.exports = {createLocation}