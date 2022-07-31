const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: String,
    role: {type: String, required: true, enum: ['admin', 'user']},
    email: {type: String, required: true, unique: true},
    password: String,
    contactInfo: String,
    image: String,
    history: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
    discount: Number,
    discountPersonalPercent: Number
}, {
    timestamps:true
})

module.exports = model('User', schema)