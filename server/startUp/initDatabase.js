 const Booking = require('../models/Booking')
 const City = require('../models/City')
 const Comment = require('../models/Comment')
 const Country = require('../models/Country')
 const Hotel = require('../models/Hotel')
 const Room = require('../models/Room')
 const ServiceFree = require('../models/ServiceFree')
 const ServicePaid = require('../models/ServicePaid')

 const bookingMock = require('../mock/booking.json')
 const citiesMock = require('../mock/cities.json')
 const commentsMock = require('../mock/comment.json')
 const countriesMock = require('../mock/countries.json')
 const hotelsMock = require('../mock/hotels.json')
 const roomsMock = require('../mock/rooms.json')
 const servicesFreeMock = require('../mock/servicesFree.json')
 const servicesPaidMock = require('../mock/servicesPaid.json')

 module.exports = async() => {
    
    const booking = await Booking.find()    
    if (booking.length !== bookingMock.length) {
        console.log('booking: ', booking.length, bookingMock.length)
        await createInitialEntity(Booking, bookingMock)
        const bookingAfterSave = await Booking.find() 
        console.log('bookingAfterSave: ', bookingAfterSave.length)
    }

    const cities = await City.find()
    if (cities.length !== citiesMock.length) {
        await createInitialEntity(City, citiesMock)
    }

    const comments = await Comment.find()
    if (comments.length !== commentsMock.length) {
        console.log('comment: ', comments.length, commentsMock.length)
        await createInitialEntity(Comment, commentsMock)
        const commentsAfterSave = await Comment.find()
        console.log('comment: ', commentsAfterSave.length)
    }

    const countries = await Country.find()
    if (countries.length !== countriesMock.length) {
        await createInitialEntity(Country, countriesMock)
    }

    const hotels = await Hotel.find()
    if (hotels.length !== hotelsMock.length) {
        console.log('hotel: ', hotels.length, hotelsMock.length)
        await createInitialEntity(Hotel, hotelsMock)
    }

    const rooms = await Room.find()
    if (rooms.length !== roomsMock.length) {
        console.log('room: ', rooms.length, roomsMock.length)
        await createInitialEntity(Room, roomsMock)
    }

    const servicesFree = await ServiceFree.find()
    if (servicesFree.length !== servicesFreeMock.length) {
        await createInitialEntity(ServiceFree, servicesFreeMock)
    }

    const servicesPaid = await ServicePaid.find()
    if (servicesPaid.length !== servicesPaidMock.length) {
        await createInitialEntity(ServicePaid, servicesPaidMock)
    }
 }

 async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                console.log(newItem)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
} 