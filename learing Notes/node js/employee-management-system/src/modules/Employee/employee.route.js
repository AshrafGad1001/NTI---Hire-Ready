const express = require("express");
const router = express.Router();
const employeeController = require("./employee.controller");
const protect = require("../../middleware/protect");
const restrictTo = require("../../middleware/restrictTo");

// ── كل routes الموظفين محتاجة authentication ──
// بدل ما نكتب protect على كل route لوحدها، بنحطه مرة واحدة هنا
// وبيتطبق على كل الـ routes اللي بعده
router.use(protect);

router
    .route("/")
    // GET /api/employees — أي يوزر مسجل دخول يقدر يشوف الموظفين
    .get(employeeController.getAllEmployees)
    // POST /api/employees — admin بس يقدر يضيف موظف جديد
    .post(restrictTo("admin"), employeeController.createEmployee);

router
    .route("/:id")
    // GET /api/employees/:id — أي يوزر مسجل دخول
    .get(employeeController.getEmployee)
    // PATCH /api/employees/:id — admin بس
    .patch(restrictTo("admin"), employeeController.updateEmployee)
    // DELETE /api/employees/:id — admin بس
    .delete(restrictTo("admin"), employeeController.deleteEmployee);

module.exports = router;