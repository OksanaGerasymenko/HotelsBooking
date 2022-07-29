const {Schema, model} = require('mongoose')

const schema = new Schema({
    dateFrom: {type: Date, required: true},
    dateTo: {type: Date, required: true},
    roomId: {type: Schema.Types.ObjectId, ref: 'Room'},
    roomNumber: Number,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    countAdult: Number,
    countChildren: Number,
    ageChildren: [Number]
}, {
    timestamps: true
})

module.exports = model('Booking', schema)