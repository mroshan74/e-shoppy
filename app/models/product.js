const mongoose = require('mongoose')

const Schema = mongoose.Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 32,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    productCode: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    stock: {
        type: Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0,
    },
    photo: {
        data: Buffer,
        contentType: String,
    }
},{timestamps: true})

const Product = mongoose.model('Product', productSchema)

module.exports = Product