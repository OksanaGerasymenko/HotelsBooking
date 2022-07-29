const {Schema, model} = require('mongoose')

const schema = new Schema({    
    name: String,
    image: String,
    priceAdult: Number,
    priceChild: Number
}, {
    timestamps:true
})

module.exports = model('ServicePaid', schema)