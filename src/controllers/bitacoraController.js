const { ChangeLog, Employee, User } = require('../models');

module.exports = {
  list: async (req, res, next) => {
    try {
      const logs = await ChangeLog.findAll({
        include: [Employee, User],
        order: [['createdAt', 'DESC']]
      });
      res.render('bitacora/list', { title: 'Bitácora de cambios', logs });
    } catch (err) {
      next(err);
    }
  }
};
