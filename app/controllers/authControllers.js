const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const authControllers = {}

authControllers.register = (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                errors: 'Operation failed',
                message: 'Failed to save user',
        })
    })
}

authControllers.login = (req,res) => {
    const { body } = req
    User.findOne({ email: body.email })
        .then(user => {
            if(!user){
                res.status(400).json({
                    errors: 'Invalid operation',
                    message: 'Invalid email or password'
                })
            }
            else{
                bcryptjs.compare(body.password,user.password)
                    .then(match => {
                        if(match){
                            const tokenData = {
                                    _id: user._id,
                                    fullName: user.fullName,
                                    email: user.email
                                }
                            const token = jwt.sign(tokenData, process.env.JWT_SECRET)
                            res.cookie('token',token, { expire: new Date() + 9999 })
                            const { _id, fullName, email, role } = user
                            res.json({ token, user: { _id, fullName, email, role } })
                        }
                        else {
                            res.status(422).json({
                                errors: 'Invalid operation',
                                message: 'Invalid email or password'
                            })
                        }
                    }).catch(err => res.json(err))
            }
        }).catch(err => res.json(err))
}

authControllers.signout = (req,res) => {
    res.clearCookie('token')
    res.json({
        message: 'user signed out successfully'
    })
}

module.exports = authControllers