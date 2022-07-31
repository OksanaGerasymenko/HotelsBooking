const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')
const Room = require('../models/Room')

router.get('/', async (req, res) => {
    try {
        const list = await Room.find()
        res.status(200).send(list)
    } catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.post('/', auth, admin, async (req, res) => {
    try {
        const newRoom = await Room.create({
            ...req.body
        })
        res.status(201).send(newRoom)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.patch('/:roomId', auth, admin, async (req, res) => {
    try {
        const { roomId } = req.params
        const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, { new: true })
        res.send(updatedRoom)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.delete('/:roomId', auth, admin, async (req, res) => {
    try {
        const { roomId } = req.params
        const removedRoom = await Room.findByIdAndDelete(roomId)
        res.send(null)
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})
module.exports = router