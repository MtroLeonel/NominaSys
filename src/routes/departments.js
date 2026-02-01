const router = require('express').Router();
const departmentController = require('../controllers/departmentController');

router.get('/', departmentController.list);
router.get('/new', departmentController.newForm);
router.post('/', departmentController.create);

module.exports = router;
