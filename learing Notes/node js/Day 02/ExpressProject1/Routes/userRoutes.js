const express = require('express');
const userServices = require('../Services/userServices');

const router = express.Router();

router.route('/')
    .get(userServices.getAllUsers)
    .post(userServices.createUser);

router.route('/:id')
    .get(userServices.getUserById)
    .put(userServices.updateUser)
    .delete(userServices.deleteUser);

module.exports = router;