const router = require('express').Router();
const { ChangeLog, Employee, User } = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const logs = await ChangeLog.findAll({
      include: [Employee, User],
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
