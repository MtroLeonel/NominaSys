const router = require('express').Router();
const { authenticateToken } = require('../../middlewares/authJwt');

const authRoutes = require('./auth');
const employeeRoutes = require('./employees');
const departmentRoutes = require('./departments');
const positionRoutes = require('./positions');
const payrollRoutes = require('./payroll');
const bitacoraRoutes = require('./bitacora');
const bonusRoutes = require('./bonuses');

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API operativa' });
});

router.use('/auth', authRoutes);

// Todas las rutas siguientes requieren JWT.
router.use(authenticateToken);
router.use('/empleados', employeeRoutes);
router.use('/departamentos', departmentRoutes);
router.use('/puestos', positionRoutes);
router.use('/payroll', payrollRoutes);
router.use('/bitacora', bitacoraRoutes);
router.use('/bonos', bonusRoutes);

module.exports = router;
