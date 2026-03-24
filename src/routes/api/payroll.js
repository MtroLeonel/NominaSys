const router = require('express').Router();
const { PayrollPeriod } = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const periods = await PayrollPeriod.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: periods });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { type, startDate, endDate } = req.body;

    if (!type || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'type, startDate y endDate son requeridos' });
    }

    const period = await PayrollPeriod.create({ type, startDate, endDate });
    return res.status(201).json({ success: true, data: period });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
