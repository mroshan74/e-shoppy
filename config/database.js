const mongoose = require('mongoose')
require('dotenv').config()

const configureDB = () => {
    let url = process.env.DB_LOCAL
    mongoose.connect(url,{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => {
            console.log('connected to e-shoppy db ...')
        })
        .catch(err => console.log(err))
}

module.exports = configureDB