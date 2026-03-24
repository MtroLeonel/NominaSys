const router = require('express').Router();
const { Employee, Department, Position, Assignment } = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      include: [{ model: Assignment, include: [Department, Position], separate: false }],
      order: [['lastName', 'ASC']]
    });

    res.json({ success: true, data: employees });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, curp, hireDate, dailySalary, departmentId, positionId } = req.body;

    if (!firstName || !lastName || !curp || !hireDate || !dailySalary || !departmentId || !positionId) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    const employee = await Employee.create({ firstName, lastName, curp, hireDate, dailySalary });

    await Assignment.create({
      employeeId: employee.id,
      departmentId,
      positionId,
      dailySalary,
      startDate: hireDate
    });

    const created = await Employee.findByPk(employee.id, {
      include: [{ model: Assignment, include: [Department, Position], separate: false }]
    });

    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
