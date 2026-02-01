const router = require('express').Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.list);
router.get('/new', employeeController.newForm);
router.post('/', employeeController.create);

module.exports = router;
