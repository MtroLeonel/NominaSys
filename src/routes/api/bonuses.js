const router = require('express').Router();
const { Bonus } = require('../../models');

function toBoolean(value) {
  return value === true || value === 'true' || value === 1 || value === '1';
}

router.get('/', async (req, res, next) => {
  try {
    const bonuses = await Bonus.findAll({ order: [['name', 'ASC']] });
    res.json({ success: true, data: bonuses });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, amountType, amount, active } = req.body;

    if (!name || !amountType || amount === undefined) {
      return res.status(400).json({ success: false, message: 'name, amountType y amount son requeridos' });
    }

    const bonus = await Bonus.create({
      name,
      amountType,
      amount,
      active: active === undefined ? true : toBoolean(active)
    });

    return res.status(201).json({ success: true, data: bonus });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
