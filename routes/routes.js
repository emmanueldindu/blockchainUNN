const { addUser,
    getAllUsers,
    getAlluserView

} = require('../controller/registerController')

const express = require('express')
const router = express.Router();



router.post('/addUser', addUser)
router.get('/addUser',)


module.exports = {
    routes: router
}