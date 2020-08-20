const Order = require('../models/order')
const Product = require('../models/product')
const User = require('../models/user')
const orderControllers = {}

orderControllers.list = (req,res) => {
    Order.find()
        .populate('user', '_id name')
        .then(orders => {
            res.json(orders)
        })
        .catch(err => res.json(err))
}

orderControllers.show = (req,res) => {
    const id = req.params.id
    Order.findOne({_id: id, user: req.user._id})
        .populate('products.product', 'name price')
        .then(order => {
            res.json(order)
        })
        .catch(err => res.json(err))
}

orderControllers.create = (req,res) => {
    const { body } = req
    const order = new Order(body)
    order.user = req.user._id
    order.save()
        .then(order => {
            //update stock operation
            let updateStockOperation = order.products.map(product => {
                return {
                    updateOne: {
                        filter: { _id: product._id },
                        update: { $inc: {
                            sold: +product.quantity,
                            stock: -product.quantity,
                        }}
                    }
                }
            })
        
            Product.bulkWrite(updateStockOperation, {}, (err,products) => {
                if(err){
                    return res.status(400).json({
                        success: false,
                        errors: 'Bulk operation failed',
                        message: 'Unable to update stocks by order'
                    })
                }
            })
            
            // save order to purchase
            User.findOneAndUpdate({_id: req.user._id},{
                $push: {
                    purchases: order
                }
            }).then()
            .catch(err => res.json(err))
            res.json(order)
        })
        .catch(err => res.json(err))
}

orderControllers.update = (req,res) => {
    const id = req.params.id
    const { body } = req
    Order.findOneAndUpdate({_id: id},body,{new: true})
        .then(order => {
            res.json(order)
        })
        .catch(err => res.json(err))
}

module.exports = orderControllers