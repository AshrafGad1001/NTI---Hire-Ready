const students = require('../../Data/students');



function validateStudent(data) {
    const requiredFields = ['name', 'age', 'phone', 'address'];
    const missing = requiredFields.filter(field => !data[field]);
    return missing;
}

function generateId(arr) {
    return arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;
}

function createStudent(data) {
    return {
        id:      generateId(students),
        name:    data.name,
        age:     Number(data.age),
        phone:   data.phone,
        address: data.address
    };
}

















const getAllStudents = (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
};

const getStudentById = (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));

    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
};

const addStudent = (req, res) => {
    const missing = validateStudent(req.body);

    if (missing.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Missing required fields: ${missing.join(', ')}`
        });
    }

    const newStudent = createStudent(req.body);
    students.push(newStudent);

    res.status(201).json({ success: true, data: newStudent });
};

const updateStudent = (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    const { name, age, phone, address } = req.body;

    students[index] = {
        ...students[index],
        name:    name    ?? students[index].name,
        age:     age     ?? students[index].age,
        phone:   phone   ?? students[index].phone,
        address: address ?? students[index].address,
    };

    res.status(200).json({ success: true, data: students[index] });
};

const deleteStudent = (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    const deleted = students.splice(index, 1);

    res.status(200).json({ success: true, data: deleted[0] });
};







module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
};