const express = require('express')
const router = express.Router({ mergeParams: true })
const Comment = require('../models/Comment')

router.get('/', async (req, res) => {
    try {
        const list = await Comment.find()
        res.status(200).send(list)
    } catch(err) {
        res.status(500).json({ message: 'Something was wrong on the server. Try it later...'})
    }
})
module.exports = router