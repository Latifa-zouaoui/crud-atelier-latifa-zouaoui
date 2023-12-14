var express = require('express');
var router = express.Router();
var validation= require('../middleware/validationUser')
var { findAll1,createUser,displayUpdateUserform,updateUser,deleteUser} = require('../services/userService')

router.get('/', findAll1);
router.post('/createUser',validation, createUser);
router.get('/updateUser/:id', displayUpdateUserform);
router.post('/updateUser/:id', updateUser);
router.get('/deleteUser/:id', deleteUser);

module.exports = router;
