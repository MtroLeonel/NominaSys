const router = require('express').Router();
const { Department } = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const departments = await Department.findAll({ order: [['name', 'ASC']] });
    res.json({ success: true, data: departments });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, code, status } = req.body;

    if (!name || !code) {
      return res.status(400).json({ success: false, message: 'name y code son requeridos' });
    }

    const department = await Department.create({ name, code, status: status || 'activo' });
    return res.status(201).json({ success: true, data: department });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
