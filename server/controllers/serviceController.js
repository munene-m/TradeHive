const serviceModel = require('../models/Service')
const asyncHandler = require('express-async-handler')

//create new service
const createService = asyncHandler(async (req, res) => {
    const { name, description, price, duration, provider, category } = req.body
    if(!name || !description || !price || !duration || !provider || !category) {
        res.status(400)
        throw new Error("Please enter all required fields")
    }
    const service = await serviceModel.create({
        name,
        description,
        price,
        duration,
        provider,
        category,
        user: req.user.id
    })
    if(service){
        res.status(201).json({
            _id: service.id,
            name: service.name,
            description: service.description,
            duration: service.duration,
            provider: service.provider,
            category: service.category
        })
    } else {
        res.status(400).json({error: "An error occurred"})
    }
})

//update new service
const updateService = asyncHandler(async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "description", "price", "duration", "category"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
        return res.status(400).json({error: "Invalid updates!"})
    }
    try {
        const service = await serviceModel.findOne({
            _id: req.params.id,
            freelancer: req.user._id
        })
        if(!service) {
            return res.status(404).json({error : "The service you wanted to update does not exist"})
        }
        updates.forEach((update) => (service[update] = req.body[update]))
        await service.save()
        res.json(service)
    } catch (err) {
        res.status(400).json(err.message)        
    }


  //  try {
    //     const updatedService = await serviceModel(req.params.id, req.body, { new: true })
    //     res.status(200).json(updatedService)
    // } catch (err) {
    //     res.status(400)
    //     throw new Error(err.message)
    // }
})

//delete service
const deleteService = asyncHandler(async (req, res) => {
    try {
        await serviceModel.findByIdAndDelete({
            _id: req.params.id,
            freelancer: req.user._id
        })
        res.status(200).json("Service has been successfully deleted!")
    } catch (err) {
        res.status(400)
        throw new Error(err.message) 
    }
})

//get single servive
const getService = asyncHandler(async (req, res) => {
    try {
        const Service = await serviceModel.findOne({
             _id: req.params.id,
             freelancer: req.user._id
        })
        res.status(200).json(Service)
    } catch (err) {
        res.status(400)
        throw new Error(err.message)
    }
})

//get all services by one freelancer
const getAllServices = asyncHandler(async (req, res) => {
    try {
        const Services = await serviceModel.find({ 
            freelancer: req.user._id
        })
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
    getAllServices
}