const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')
const router = express.Router({ mergeParams: true })

router.patch('/:userId', auth, async (req, res) => {
    try {
        const {userId} = req.params        
        if (userId && userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true })
            res.send(updatedUser)
        }else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something was wrong on the server. Try it later...'
        })
    }
})

router.get('/', auth, admin, async (req, res) => {
    try {
        
        const list = await User.find()
        res.send(list)
    } catch (error) {
        res.status(500).json({
            message: 'Something was wrong on the server. Try it later...'
        })
    }
})
module.exports = router