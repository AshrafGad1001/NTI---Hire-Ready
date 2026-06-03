const express = require('express');
const router = express.Router();

const {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
} = require('./user.controller');

router.get('/getAllStudents',       getAllStudents);
router.get('/getById/:id',         getStudentById);
router.post('/addStudent',         addStudent);
router.put('/updateStudent/:id',   updateStudent);
router.delete('/deleteStudent/:id', deleteStudent);

module.exports = router;