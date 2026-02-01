const { Position } = require('../models');

module.exports = {
  list: async (req, res, next) => {
    try {
      const positions = await Position.findAll({ order: [['name', 'ASC']] });
      res.render('positions/list', { title: 'Puestos', positions });
    } catch (err) {
      next(err);
    }
  },
  newForm: (req, res) => {
    res.render('positions/new', { title: 'Nuevo Puesto' });
  },
  create: async (req, res, next) => {
    try {
      const { name, level, baseSalary, status } = req.body;
      await Position.create({ name, level, baseSalary, status: status || 'activo' });
      res.redirect('/puestos');
    } catch (err) {
      next(err);
    }
  }
};
