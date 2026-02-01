const router = require('express').Router();
const positionController = require('../controllers/positionController');

router.get('/', positionController.list);
router.get('/new', positionController.newForm);
router.post('/', positionController.create);

module.exports = router;
