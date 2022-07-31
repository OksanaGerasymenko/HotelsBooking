const User = require('../models/User')

module.exports = async(req, res, next) => {
    try {
        const currentUser = await User.findById(req.user._id)
        if (!currentUser || currentUser.role !== 'admin') {
            return res.status(401).json({message: 'Unauthorized'})  
        }
        next()
    } catch (err) {
        return res.status(401).json({message: 'Unauthorized'}) 
    }
    
}