const express = require('express')
const router = express.Router({ mergeParams: true })
const Booking = require('../models/Booking')

router.get('/', async (req, res) => {
    try {
        const list = await Booking.find()
        res.status(200).send(list)
    } catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})
module.exports = router