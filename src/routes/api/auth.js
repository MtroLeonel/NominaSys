const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y password son requeridos'
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales invalidas'
      });
    }

    let isValidPassword = false;

    if (user.passwordHash) {
      isValidPassword = await bcrypt.compare(password, user.passwordHash).catch(() => false);
    }

    // Compatibilidad con seed legado que guarda password en texto plano.
    if (!isValidPassword && password === user.passwordHash) {
      isValidPassword = true;
      user.passwordHash = await bcrypt.hash(password, 10);
      await user.save();
    }

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales invalidas'
      });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'dev-change-me',
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    return res.json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
