const jet = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')


    function generateToken(payload){
        const accessToken = jwt.sign(payload, config.get('accessSecret'), {expiresIn: '1h'})
        console.log(accessToken)
        const refreshToken = jwt.sign(payload, config.get('refreshSecret'))
        console.log(refreshToken)
        return {
            accessToken,
            refreshToken,
            expiresIn: 3600
        }
    }

    async function saveToken(userId, refreshToken) {
        const data = await Token.findOne({userId})
        if (data) {
            data.refreshToken = refreshToken
            return data.save()
        }
        const token = await Token.create({userId, refreshToken})
        return token
    }

module.exports = {generateToken, saveToken}