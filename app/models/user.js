const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')

const Schema = mongoose.Schema
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
        validator: function(value){
            return isEmail(value)
        },
        message: function(){
            return 'invalid email format'
        }
    }
  },
  password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 64
  },
  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: []
  },
},{timestamps: true})

userSchema.pre('save',function(next){
  bcryptjs.genSalt()
    .then(salt => {
      bcryptjs.hash(this.password,salt)
        .then(encrypted => {
          this.password = encrypted
          next()
        })
    })
})

const User = mongoose.model('User',userSchema)
module.exports = User