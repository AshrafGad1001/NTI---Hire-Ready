const express = require("express");
const router = express.Router();
const employeeController = require("./employee.controller");
const protect = require("../../middleware/protect");
const restrictTo = require("../../middleware/restrictTo");
const validate = require("../../middleware/validate");
const { createEmployeeSchema, updateEmployeeSchema } = require("./employee.validation");

router.use(protect);
router
    .route("/")
    .get(employeeController.getAllEmployees)
    .post(restrictTo("admin"), validate(createEmployeeSchema), employeeController.createEmployee);
router
    .route("/:id")
    .get(employeeController.getEmployee)
    .patch(restrictTo("admin"), validate(updateEmployeeSchema), employeeController.updateEmployee)
    .delete(restrictTo("admin"), employeeController.deleteEmployee);
module.exports = router;