const express = require('express')

//const verifyToken = require('../middlewares/verifyToken')

//ROUTES
const users = require('./users')

//ROUTE INSTANCE
const router = express.Router()

//BASE ROUTE
router.use('/users', /*verifyToken,*/ users)
    
module.exports = router