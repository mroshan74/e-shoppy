const mongoose = require('mongoose')
const { cartSchema } = require('./cart')

const Schema = mongoose.Schema
const orderSchema = new Schema({
    products: [cartSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    updated: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order