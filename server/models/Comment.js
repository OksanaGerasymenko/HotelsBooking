const {Schema, model} = require('mongoose')

const schema = new Schema({
    content: String,
    hotelId: {type: Schema.Types.ObjectId, ref: 'Hotel'},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps:{ createdAt: 'created_at' }
})

module.exports = model('Comment', schema)