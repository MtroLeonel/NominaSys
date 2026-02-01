const { PayrollPeriod } = require('../models');

module.exports = {
  list: async (req, res, next) => {
    try {
      const periods = await PayrollPeriod.findAll({ order: [['createdAt', 'DESC']] });
      res.render('payroll/list', { title: 'Periodos de nómina', periods });
    } catch (err) {
      next(err);
    }
  },
  newForm: (req, res) => {
    res.render('payroll/new', { title: 'Nuevo periodo de nómina' });
  },
  create: async (req, res, next) => {
    try {
      const { type, startDate, endDate } = req.body;
      await PayrollPeriod.create({ type, startDate, endDate });
      res.redirect('/payroll');
    } catch (err) {
      next(err);
    }
  }
};
