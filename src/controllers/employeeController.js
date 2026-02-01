const { Employee, Department, Position, Assignment } = require('../models');

module.exports = {
  list: async (req, res, next) => {
    try {
      const employees = await Employee.findAll({
        include: [{ model: Assignment, include: [Department, Position], separate: false }],
        order: [['lastName', 'ASC']]
      });
      res.render('employees/list', { title: 'Empleados', employees });
    } catch (err) {
      next(err);
    }
  },
  newForm: async (req, res, next) => {
    try {
      const departments = await Department.findAll({ order: [['name', 'ASC']] });
      const positions = await Position.findAll({ order: [['name', 'ASC']] });
      res.render('employees/new', { title: 'Nuevo Empleado', departments, positions });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const { firstName, lastName, curp, hireDate, dailySalary, departmentId, positionId } = req.body;
      const employee = await Employee.create({ firstName, lastName, curp, hireDate, dailySalary });
      await Assignment.create({
        employeeId: employee.id,
        departmentId,
        positionId,
        dailySalary,
        startDate: hireDate
      });
      res.redirect('/empleados');
    } catch (err) {
      next(err);
    }
  }
};
