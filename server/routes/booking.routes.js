const express = require('express')
const router = express.Router({ mergeParams: true })
const Booking = require('../models/Booking')
const auth = require('../middleware/auth.middleware')

router.get('/', auth, async (req, res) => {
    try {
        const { orderBy, equalTo } = req.query        
        const list = await Booking.find({ [orderBy]: equalTo })
        res.send(list)
    } catch(err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.post('/', auth, async (req, res) => {
    try {              
        const newBooking = await Booking.create({
            ...req.body,
            userId: req.user._id
        })
        return res.status(201).send(newBooking)
    } catch(err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.delete('/:bookingId', auth, async (req, res) => {
    try {
        const { bookingId } = req.params
        const removedBooking = await Booking.findById(bookingId)
        if (!removedBooking) {
            return res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
        }
        if (removedBooking.userId.toString() === req.user._id) {
            await removedBooking.remove()
            return res.send(null)
        } else {
            const currentUser = await User.findById(req.user._id)
            if (currentUser?.role === 'admin') {
                await removedBooking.remove()
                return res.send(null)
            } else {
                return res.status(401).json({message: 'Unauthorized'}) 
            }
        }
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.patch('/:bookingId', auth, async (req, res) => {
    try {
        const { bookingId } = req.params        
        if (updatedBooking.userId.toString() === req.user._id) {
            const updatedBooking = await Booking.findByIdAndUpdate(bookingId, req.body, {new: true})
            return res.send(updatedBooking)
        } else {
            const currentUser = await User.findById(req.user._id)
            if (currentUser?.role === 'admin') {
                const updatedBooking = await Booking.findByIdAndUpdate(bookingId, req.body, {new: true})
            return res.send(updatedBooking)
            } else {
                return res.status(401).json({message: 'Unauthorized'}) 
            }
        }
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})
module.exports = router