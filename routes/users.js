const express = require('express')
const router = express.Router()

//CONTROLLER
const Users = require('../controllers/UsersController')
router.get('/:id', Users.getById)

module.exports = router