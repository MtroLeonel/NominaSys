const router = require('express').Router();
const payrollController = require('../controllers/payrollController');

router.get('/', payrollController.list);
router.get('/new', payrollController.newForm);
router.post('/', payrollController.create);

module.exports = router;
