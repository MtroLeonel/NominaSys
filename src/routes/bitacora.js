const router = require('express').Router();
const bitacoraController = require('../controllers/bitacoraController');

router.get('/', bitacoraController.list);

module.exports = router;
