const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/booking', require('./booking.routes'))
router.use('/city', require('./city.routes'))
router.use('/comment', require('./comment.routes'))
router.use('/country', require('./country.routes'))
router.use('/hotel', require('./hotel.routes'))
router.use('/room', require('./room.routes'))
router.use('/serviceFree', require('./serviceFree.routes'))
router.use('/servicePaid', require('./servicePaid.routes'))
router.use('/token', require('./token.routes'))
router.use('/user', require('./user.routes'))


module.exports = router