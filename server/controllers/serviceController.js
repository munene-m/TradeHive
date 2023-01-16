const serviceModel = require('../models/Service')
const asyncHandler = require('express-async-handler')

//create new service
const createService = asyncHandler(async (req, res) => {
    const Service = new serviceModel(req.body)
    try {
        const saveService = await Service.save()
        res.status(200).json(saveService)
    } catch (err) {
        res.status(400)
        throw new Error(err.message)        
    }
})

//update new service
const updateService = asyncHandler(async (req, res) => {
    try {
        const updatedService = await serviceModel(req.params.id, req.body, { new: true })
        res.status(200).json(updatedService)
    } catch (err) {
        res.status(400)
        throw new Error(err.message)
    }
})

//delete service
const deleteService = asyncHandler(async (req, res) => {
    try {
        await serviceModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Service has been successfully deleted!")
    } catch (err) {
        res.status(400)
        throw new Error(err.message) 
    }
})

//get single service
const getService = asyncHandler(async (req, res) => {
    try {
        const Service = await serviceModel.findOne({ id: req.user.id })
        res.status(200).json(Service)
    } catch (error) {
        res.status(400)
        throw new Error(err.message)
    }
})

//find services
const getServices = asyncHandler(async (req, res) => {
    try {
        const Services = await serviceModel.find()
        res.status(200).json(Services)
    } catch (err) {
        res.status(400)
        throw new Error(err.message)
    }
})

module.exports = {
    createService,
    updateService,
    deleteService,
    getService,
    getServices
}