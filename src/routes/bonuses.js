const router = require('express').Router();
const bonusController = require('../controllers/bonusController');

router.get('/', bonusController.list);
router.get('/new', bonusController.newForm);
router.post('/', bonusController.create);

module.exports = router;
