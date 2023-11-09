const express = require('express')
const router = express.Router()
const { 
    createUser,
    loginUser
} = require('../controllers/userController')

// CREATE new user
router.post('/register', createUser)

// LOGIN user
router.post('/login', loginUser)

module.exports = router