const User = require('../models/user')
const Order = require('../models/order')
const userControllers = {}

function trimUser(user){
    let trim = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        purchases: user.purchases
    }
    return trim
}

userControllers.account = (req,res) => {
    const { user } = req
    res.json(trimUser(user))
}

userControllers.getUser = (req,res) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            if(user){
                res.json(trimUser(user))
            }
            else{
                res.status(400).json({
                    errors: 'Not Found',
                    message: 'User not found'
                })
            }
        }).catch(err => res.json(err))
}

userControllers.updateUser = (req,res) => {
    const id = req.params.id
    const { body } = req
    User.findByIdAndUpdate({_id: id},body,{new: true})
        .then(user => {
            if(user){
                res.json(trimUser(user))
            }
            else{
                res.status(400).json({
                    errors: 'Not Found',
                    message: 'User not found'
                })
            }
        }).catch(err => res.json(err))
}

userControllers.userPurchaseList = (req,res) => {
    Order.find({user: req.user._id})
        .then(list => {
            if(list){
                res.json(list)
            }
            else{
                res.json({ message: `You haven't made any orders yet.`})
            }
        })
}


module.exports = userControllers