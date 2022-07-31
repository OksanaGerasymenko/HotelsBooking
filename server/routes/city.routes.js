const express = require('express')
const router = express.Router({ mergeParams: true })
const City = require('../models/City')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')

router.get('/', async (req, res) => {
    try {
        const list = await City.find()
        res.status(200).send(list)
    } catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.post('/', auth, admin, async (req, res) => {
    try {
        const newCity = await City.create({
            ...req.body
        })
        res.status(201).send(newCity)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.patch('/:cityId', auth, admin, async (req, res) => {
    try {
        const { cityId } = req.params
        const updatedCity = await City.findByIdAndUpdate(cityId, req.body, { new: true })
        res.send(updatedCity)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.delete('/:cityId', auth, admin, async (req, res) => {
    try {
        const { cityId } = req.params
        const removedCity = await City.findByIdAndDelete(cityId)
        res.send(null)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

module.exports = router