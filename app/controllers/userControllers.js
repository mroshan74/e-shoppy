const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const userControllers = {}

userControllers.register = (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            res.json({
                _id: user._id,
                username: user.username,
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

userControllers.login = (req,res) => {
    const { body } = req
    User.findOne({
        $or: [
            { username: body.identifier },
            { email: body.identifier }
        ]
    })
        .then(user => {
            if(!user){
                res.status(400).json({
                    errors: 'Invalid operation',
                    message: 'Invalid username/email or password'
                })
            }
            else{
                bcryptjs.compare(body.password,user.password)
                    .then(match => {
                        if(match){
                            const tokenData = {
                                    _id: user._id,
                                    username: user.username,
                                    email: user.email
                                }
                            const token = jwt.sign(tokenData, process.env.JWT_SECRET)
                            res.cookie('token',token, { expire: new Date() + 9999 })
                            const { _id, username, email, role } = user
                            res.json({ token, user: { _id, username, email, role } })
                        }
                        else {
                            res.status(422).json({
                                errors: 'Invalid operation',
                                message: 'Invalid username/email or password'
                            })
                        }
                    }).catch(err => res.json(err))
            }
        }).catch(err => res.json(err))
}

module.exports = userControllers