const { Bonus } = require('../models');

module.exports = {
  list: async (req, res, next) => {
    try {
      const bonuses = await Bonus.findAll({ order: [['name', 'ASC']] });
      res.render('bonuses/list', { title: 'Bonos', bonuses });
    } catch (err) {
      next(err);
    }
  },
  newForm: (req, res) => {
    res.render('bonuses/new', { title: 'Nuevo bono' });
  },
  create: async (req, res, next) => {
    try {
      const { name, amountType, amount, active } = req.body;
      await Bonus.create({ name, amountType, amount, active: active !== undefined });
      res.redirect('/bonos');
    } catch (err) {
      next(err);
    }
  }
};
