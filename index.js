const express = require('express')
const app = express()
const port = process.env.PORT || 6500
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(morgan('dev'))

app.use(express.static('uploads'))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const configureDB = require('./config/database')
configureDB()

const routes = require('./config/routes')
app.use('/api',routes)

app.listen(port, () => {
    console.log('SERVER PORT LISTENING ---> ',port)
})