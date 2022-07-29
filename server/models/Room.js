const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: String,
    hotelId: {type: Schema.Types.ObjectId, ref: 'Hotel'},
    maxCountMembers: Number,
    price: Number,
    description: String,
    images: [String],
    servicesFree: [{type: Schema.Types.ObjectId, ref: 'ServiceFree'}],
    servicesPaid: [{type: Schema.Types.ObjectId, ref: 'ServicePaid'}],
    hotelRoomNumbers: [Number]
}, {
    timestamps:true
})

module.exports = model('Room', schema)