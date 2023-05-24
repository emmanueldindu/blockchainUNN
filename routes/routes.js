const { addUser,
    getAllUsers,
    getAlluserView

} = require('../controller/registerController')

const express = require('express')
const router = express.Router();



router.post('/registered', addUser)
router.get('/registered',)


module.exports = {
    routes: router
}