const express = require('express')
const router = express.Router()
const { getAllUser, getUser } = require("../controllers/userController")

router.get('/user', getAllUser)
router.get('/user/:id', getUser)

module.exports = router;