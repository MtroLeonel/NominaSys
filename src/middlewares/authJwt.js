const jwt = require('jsonwebtoken');

function getBearerToken(authHeader) {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) return null;
  return token;
}

function authenticateToken(req, res, next) {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token no proporcionado. Usa Authorization: Bearer <token>'
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-change-me');
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Token invalido o expirado'
    });
  }
}

module.exports = {
  authenticateToken
};
