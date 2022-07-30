const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {generateUserData} = require('../utils/helpers')
const {generateToken, saveToken} = require('../services/token.service')

router.post('/signUp', async (req, res) => {
    try {
        const {email, password} = req.body
        const exitingUser = await User.findOne({email})
        console.log('exitingUser: ', exitingUser)
        if (exitingUser) {
            return res.status(400).json({
                error: {
                    message: 'EMAIL_EXISTS',
                    code: 400
                }
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const userData = {
            ...generateUserData(),
            ...req.body,
            password: hashedPassword

        }
        
        const newUser = await User.create(userData)
        console.log('newUser:', newUser)

        const tokens = generateToken({_id: newUser._id})
        console.log('tokens:', tokens)
        await saveToken(newUser._id, tokens.refreshToken)

        res.status(201).send({...tokens, userId: newUser._id})
    }catch(err) {
        res.status(500).json({
            message: 'Something was wrong on the server. Try it later...'
        })
    }
})
router.post('/signInWithPassword', async (req, res) => {
    
})
router.post('/token', async (req, res) => {
    
})
module.exports = router