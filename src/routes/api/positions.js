const router = require('express').Router();
const { Position } = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const positions = await Position.findAll({ order: [['name', 'ASC']] });
    res.json({ success: true, data: positions });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, level, baseSalary, status } = req.body;

    if (!name || baseSalary === undefined) {
      return res.status(400).json({ success: false, message: 'name y baseSalary son requeridos' });
    }

    const position = await Position.create({ name, level, baseSalary, status: status || 'activo' });
    return res.status(201).json({ success: true, data: position });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
