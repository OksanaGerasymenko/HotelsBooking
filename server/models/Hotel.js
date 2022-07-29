const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: String,
    countryID: {type: Schema.Types.ObjectId, ref: 'Country'},
    cityID: {type: Schema.Types.ObjectId, ref: 'City'},
    address: String,
    description: String,
    rate: Number,
    stars: Number,
    distToCenter: Number,
    distToAirport: Number,
    distToRailwayStation: Number,
    servicesFree: [{type: Schema.Types.ObjectId, ref: 'ServiceFree'}],
    servicesPaid: [{type: Schema.Types.ObjectId, ref: 'ServicePaid'}],
    images: [String]
}, {
    timestamps:true
})

module.exports = model('Hotel', schema)