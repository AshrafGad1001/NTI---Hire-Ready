const Employee = require("./employee.model");

/**
 * @desc    عرض كل الموظفين
 * @route   GET /api/employees
 * @access  Protected — أي يوزر مسجل دخول
 */
exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find()
            // populate بتجيب بيانات اليوزر اللي أنشأ السجل بدل ما ترجع الـ ObjectId بس
            // بنحدد "name email" عشان ما نرجعش كل البيانات (زي الباسورد)
            .populate("createdBy", "name email")
            .select("-__v"); // بنشيل الـ __v field عشان مش محتاجينه في الـ response

        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    عرض موظف واحد بالـ ID
 * @route   GET /api/employees/:id
 * @access  Protected — أي يوزر مسجل دخول
 */
exports.getEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id)
            .populate("createdBy", "name email")
            .select("-__v");

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        next(error); // لو الـ ID مش valid ObjectId، الـ CastError هيتمسك في errorHandler
    }
};

/**
 * @desc    إنشاء موظف جديد
 * @route   POST /api/employees
 * @access  Protected + Admin Only
 */
exports.createEmployee = async (req, res, next) => {
    try {
        // بنحط userId بتاع الـ admin اللي عمل الـ request كـ createdBy
        // req.user.userId موجود عشان الـ protect middleware حطه
        req.body.createdBy = req.user.userId;

        const employee = await Employee.create(req.body);

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee,
        });
    } catch (error) {
        next(error); // لو في validation error، الـ errorHandler هيتعامل معاه
    }
};

/**
 * @desc    تعديل بيانات موظف
 * @route   PATCH /api/employees/:id
 * @access  Protected + Admin Only
 *
 * ══ ليه PATCH مش PUT؟ ══
 * PATCH بيعدل الحقول اللي اتبعتت بس — مش محتاج تبعت كل البيانات
 * PUT بيستبدل الـ document كله — لازم تبعت كل الحقول
 */
exports.updateEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,           // بيرجع الـ document بعد التعديل مش قبله
                runValidators: true, // بيشغل الـ validators على البيانات الجديدة
                // بدون ده، ممكن حد يحط salary بالسالب في الـ update
            }
        );

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: employee,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    حذف موظف
 * @route   DELETE /api/employees/:id
 * @access  Protected + Admin Only
 */
exports.deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};