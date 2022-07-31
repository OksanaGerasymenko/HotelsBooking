const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')
const Country = require('../models/Country')

router.get('/', async (req, res) => {
    try {
        const list = await Country.find()
        res.status(200).send(list)
    } catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.post('/', auth, admin, async (req, res) => {
    try {
        const newCountry = await Country.create({
            ...req.body
        })
        res.status(201).send(newCountry)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.patch('/:countryId', auth, admin, async (req, res) => {
    try {
        const { countryId } = req.params
        const updatedCountry = await Country.findByIdAndUpdate(countryId, req.body, { new: true })
        res.send(updatedCountry)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.delete('/:countryId', auth, admin, async (req, res) => {
    try {
        const { countryId } = req.params
        const removedCountry = await Country.findByIdAndDelete(countryId)
        res.send(null)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})
module.exports = router