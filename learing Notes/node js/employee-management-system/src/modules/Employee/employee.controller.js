const Employee = require("./employee.model");
exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find()
            .populate("createdBy", "name email")
            .select("-__v"); 
        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees,
        });
    } catch (error) {
        next(error);
    }
};
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
        next(error); 
    }
};
exports.createEmployee = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.userId;
        const employee = await Employee.create(req.body);
        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee,
        });
    } catch (error) {
        next(error); 
    }
};
exports.updateEmployee = async (req, res, next) => {
    try {
        const { name, position, department, salary } = req.body;
        const updateData = {};
        
        if (name) updateData.name = name;
        if (position) updateData.position = position;
        if (department) updateData.department = department;
        if (salary !== undefined) updateData.salary = salary;

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,           
                runValidators: true, 
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