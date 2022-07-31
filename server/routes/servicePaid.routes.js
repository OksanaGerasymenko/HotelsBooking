const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')
const ServicePaid = require('../models/ServicePaid')

router.get('/', async (req, res) => {
    try {
        const list = await ServicePaid.find()
        res.status(200).send(list)
    } catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.post('/', auth, admin, async (req, res) => {
    try {
        const newServicePaid = await ServicePaid.create({
            ...req.body
        })
        res.status(201).send(newServicePaid)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.patch('/:servicePaidId', auth, admin, async (req, res) => {
    try {
        const { servicePaidId } = req.params
        const updatedServicePaid = await ServicePaid.findByIdAndUpdate(servicePaidId, req.body, { new: true })
        res.send(updatedServicePaid)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.delete('/:servicePaidId', auth, admin, async (req, res) => {
    try {
        const { servicePaidId } = req.params
        const removedServicePaid = await ServicePaid.findByIdAndDelete(servicePaidId)
        res.send(null)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})
module.exports = router