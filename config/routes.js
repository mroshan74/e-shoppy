const express = require('express')
const router = express.Router()

const userControllers = require('../app/controllers/userControllers')

router.post('/users/register',userControllers.register)
router.post('/users/login',userControllers.login)

module.exports = router