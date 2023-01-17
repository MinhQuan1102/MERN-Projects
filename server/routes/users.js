const express = require('express')
const router = express.Router()
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken')

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//   res.json('You are logged in!')
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//   res.json('You can delete accounts!')
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//   res.json('Hello admin')
// })

router.get('/', getAllUsers)
router.get('/:id', verifyUser, getUser)
router.put('/:id', verifyUser, updateUser)
router.delete('/:id', verifyUser, deleteUser)

module.exports = router