const express = require('express')
const router = express.Router()

// middlewares
const authenticateUser = require('../app/middlewares/authentication')
const isAdmin = require('../app/middlewares/isAdmin')

const authControllers = require('../app/controllers/authControllers')
const userControllers = require('../app/controllers/userControllers')
const categoryControllers = require('../app/controllers/categoryControllers')

// user auth and state status routes
router.post('/users/register',authControllers.register)
router.post('/users/login',authControllers.login)
router.get('/users/signout',authControllers.signout)

// user routes
router.get('/users/account', authenticateUser, userControllers.account)
router.get('/users/:id', authenticateUser, userControllers.getUser)
router.put('/users/update/:id', authenticateUser, userControllers.updateUser)


// category routes
router.get('/categories', authenticateUser, categoryControllers.list)
router.get('/category/:id', authenticateUser, categoryControllers.show)
router.post('/category/create', authenticateUser, isAdmin, categoryControllers.create)
router.put('/category/update/:id', authenticateUser, isAdmin, categoryControllers.update)
router.delete('/category/delete/:id', authenticateUser, isAdmin, categoryControllers.destroy)


module.exports = router