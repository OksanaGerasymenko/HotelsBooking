const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {generateUserData} = require('../utils/helpers')
const tokenService = require('../services/token.service')
const {check, validationResult} = require('express-validator')

router.post('/signUp', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'password must be at least 8 characters').isLength({min: 8}),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400,
                        errors:errors.array()
                    }
                })
            }
            const {email, password} = req.body
            const exitingUser = await User.findOne({email})
            if (exitingUser) {
                return res.status(400).json({
                    error: {
                        message: 'EMAIL_EXISTS',
                        code: 400
                    }
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const list = await User.find()
            const role = list.length? 'user' : 'admin'
            const userData = {
                ...generateUserData(role),
                ...req.body,
                password: hashedPassword

            }
            
            const newUser = await User.create(userData)

            const tokens = tokenService.generate({_id: newUser._id})
            await tokenService.save(newUser._id, tokens.refreshToken)

            res.status(201).send({...tokens, userId: newUser._id})
        }catch(err) {
            res.status(500).json({
                message: 'Something was wrong on the server. Try it later...'
            })
        }    
    }]
)

router.post('/signInWithPassword', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'password must be at least 8 characters').isLength({min: 8}),
    async (req, res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400,
                        errors:errors.array()
                    }
                })
            }

            const {email, password} = req.body
            const exitingUser = await User.findOne({email})
            if(!exitingUser) {
                return res.status(400).send({
                    error: {
                        message: 'EMAIL_NOT_FOUND',
                        code: 400
                    }
                })
            }

            const isPasswordEqual = await bcrypt.compare(password, exitingUser.password)
            if(!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: 'INVALID_PASSWORD',
                        code: 400
                    }
                })
            }

            const tokens = tokenService.generate({_id:exitingUser._id})
            await tokenService.save(exitingUser._id, tokens.refreshToken)
            res.status(200).send({...tokens, userId: exitingUser._id})

        } catch(err) {
            res.status(500).json({
                message: 'Something was wrong on the server. Try it later...'
            })
        }
    }]
)


router.post('/token', async (req, res) => {
    try{
        const {refresh_token: refreshToken} = req.body
        const data = tokenService.validateRefresh(refreshToken)
        const dbToken = await tokenService.findToken(refreshToken)

        if(!data || !dbToken || data._id !== dbToken?.userId?.toString()) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        const tokens = tokenService.generate({_id: data._id})
        await tokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({...tokens, userId: data._id})

    }catch (err) {
        res.status(500).json({
            message: 'Something was wrong on the server. Try it later...'
        })
    }
})
module.exports = router