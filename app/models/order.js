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
    },
    status: {
        type: String,
        default: 'Received',
        enum: ['Cancelled', 'Delivered', 'Received', 'Shipped', 'Processing']
    }
},{timestamps: true})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order