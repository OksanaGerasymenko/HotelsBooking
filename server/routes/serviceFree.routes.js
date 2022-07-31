const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')
const ServiceFree = require('../models/ServiceFree')

router.get('/', async (req, res) => {
    try {
        const list = await ServiceFree.find()
        res.status(200).send(list)
    } catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.post('/', auth, admin, async (req, res) => {
    try {
        const newServiceFree = await ServiceFree.create({
            ...req.body
        })
        res.status(201).send(newServiceFree)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.patch('/:serviceFreeId', auth, admin, async (req, res) => {
    try {
        const { serviceFreeId } = req.params
        const updatedServiceFree = await ServiceFree.findByIdAndUpdate(serviceFreeId, req.body, { new: true })
        res.send(updatedServiceFree)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.delete('/:serviceFreeId', auth, admin, async (req, res) => {
    try {
        const { serviceFreeId } = req.params
        const removedServiceFree = await ServiceFree.findByIdAndDelete(serviceFreeId)
        res.send(null)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})
module.exports = router