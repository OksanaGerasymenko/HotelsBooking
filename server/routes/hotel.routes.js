const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')
const Hotel = require('../models/Hotel')

router.get('/', async (req, res) => {
    try {
        const list = await Hotel.find()
        res.status(200).send(list)
    } catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.post('/', auth, admin, async (req, res) => {
    try {
        const newHotel = await Hotel.create({
            ...req.body
        })
        res.status(201).send(newHotel)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.patch('/:hotelId', auth, admin, async (req, res) => {
    try {
        const { hotelId } = req.params
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, req.body, { new: true })
        res.send(updatedHotel)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.delete('/:hotelId', auth, admin, async (req, res) => {
    try {
        const { hotelId } = req.params
        const removedHotel = await Hotel.findByIdAndDelete(hotelId)
        res.send(null)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})
module.exports = router