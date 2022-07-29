const {Schema, model} = require('mongoose')

const schema = new Schema({    
    name: String,
    image: String
}, {
    timestamps:true
})

module.exports = model('ServiceFree', schema)