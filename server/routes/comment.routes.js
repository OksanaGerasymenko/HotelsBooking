const express = require('express')
const router = express.Router({ mergeParams: true })
const Comment = require('../models/Comment')
const auth = require('../middleware/auth.middleware')

router.get('/', auth, async (req, res) => {
    try {
        const { orderBy, equalTo } = req.query        
        const list = await Comment.find({ [orderBy]: equalTo })
        res.send(list)
    } catch(err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.post('/', auth, async (req, res) => {
    try {              
        const newComment = await Comment.create({
            ...req.body,
            userId: req.user._id
        })
        return res.status(201).send(newComment)
    } catch(err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})

router.delete('/:commentId', auth, async (req, res) => {
    try {
        const { commentId } = req.params
        const removedComment = await Comment.findById(commentId)
        
        if (removedComment?.userId.toString() === req.user._id) {
            await removedComment.remove()
            return res.send(null)
        } else {
            const currentUser = await User.findById(req.user._id)
            if (currentUser?.role === 'admin') {
                await removedComment.remove()
                return res.send(null)
            } else {
                return res.status(401).json({message: 'Unauthorized'}) 
            }
        }
    }catch (err) {
        res.status(500).json({message: 'Something was wrong on the server. Try it later...'})
    }
})
module.exports = router