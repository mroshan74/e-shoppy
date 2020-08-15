const mongoose = require('mongoose')

const Schema = mongoose.Schema
const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    }
},{timestamps: true})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = { Cart, cartSchema }