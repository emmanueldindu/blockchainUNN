const { addUser,
    addDev,
    getAllUsers,
    getAlluserView,
    addCont

} = require('../controller/registerController')

const express = require('express')
const router = express.Router();



router.post('/addUser', addUser)
router.post('/addDev', addDev)
router.post('/addCont', addCont)

router.get('/addDev')
router.get('/addUser',)
router.get('/addCont')


module.exports = {
    routes: router
}