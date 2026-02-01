const { Department } = require('../models');

module.exports = {
  list: async (req, res, next) => {
    try {
      const departments = await Department.findAll({ order: [['name', 'ASC']] });
      res.render('departments/list', { title: 'Departamentos', departments });
    } catch (err) {
      next(err);
    }
  },
  newForm: (req, res) => {
    res.render('departments/new', { title: 'Nuevo Departamento' });
  },
  create: async (req, res, next) => {
    try {
      const { name, code, status } = req.body;
      await Department.create({ name, code, status: status || 'activo' });
      res.redirect('/departamentos');
    } catch (err) {
      next(err);
    }
  }
};
