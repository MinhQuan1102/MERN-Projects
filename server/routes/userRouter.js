const express = require('express')
const router = express.Router()
const { getAllUsers, getUser, deleteUser } = require('../controllers/userController')
const { verifyUser, verifyAdmin } = require('../util/verify')

// get all user
router.get('/', verifyAdmin, getAllUsers)

// get single user
router.get('/:id', verifyAdmin, getUser)

// delete user
router.delete('/:id', verifyAdmin, deleteUser)

module.exports = router