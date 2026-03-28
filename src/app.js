require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cors = require('cors');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;
const corsOriginsRaw = process.env.CORS_ORIGINS || 'https://nominasys.fly.dev,http://localhost:*,http://127.0.0.1:*';
const allowedOrigins = corsOriginsRaw
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

if (!process.env.CORS_ORIGINS) {
    console.warn('CORS_ORIGINS no está definido. Usando fallback seguro para Fly + localhost.');
}

function normalizeOrigin(origin) {
    return origin.replace(/\/$/, '');
}

function patternToRegex(pattern) {
    const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${escaped.replace(/\*/g, '.*')}$`);
}

function isAllowedOrigin(origin) {
    const normalizedOrigin = normalizeOrigin(origin);
    return allowedOrigins.some(pattern => {
        const normalizedPattern = normalizeOrigin(pattern);

        if (normalizedPattern.includes('*')) {
            return patternToRegex(normalizedPattern).test(normalizedOrigin);
        }

        return normalizedPattern === normalizedOrigin;
    });
}

const corsOptions = {
    origin: (origin, callback) => {
        // Permite requests sin Origin (Postman, curl, health checks internos).
        if (!origin) {
            return callback(null, true);
        }

        if (isAllowedOrigin(origin)) {
            return callback(null, true);
        }

        return callback(new Error('No permitido por CORS'));
    }
};

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const indexRoutes = require('./routes/index');
const departmentRoutes = require('./routes/departments');
const positionRoutes = require('./routes/positions');
const employeeRoutes = require('./routes/employees');
const payrollRoutes = require('./routes/payroll');
const bitacoraRoutes = require('./routes/bitacora');
const bonusRoutes = require('./routes/bonuses');
const apiRoutes = require('./routes/api');

app.use('/', indexRoutes);
app.use('/departamentos', departmentRoutes);
app.use('/puestos', positionRoutes);
app.use('/empleados', employeeRoutes);
app.use('/payroll', payrollRoutes);
app.use('/bitacora', bitacoraRoutes);
app.use('/bonos', bonusRoutes);
app.use('/api', apiRoutes);

function isApiRequest(req) {
    return req.originalUrl.startsWith('/api');
}

// Manejo de errores 404
app.use((req, res) => {
    if (isApiRequest(req)) {
        return res.status(404).json({
            success: false,
            message: 'Endpoint no encontrado'
        });
    }

    res.status(404).render('error', {
        title: 'Página no encontrada',
        message: 'La página que buscas no existe',
        error: { status: 404 }
    });
});

// Manejo de errores del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);

    if (isApiRequest(req)) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message || 'Error en el servidor'
        });
    }

    res.status(err.status || 500).render('error', {
        title: 'Error',
        message: err.message || 'Error en el servidor',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Sincronizar base de datos e iniciar servidor
db.sequelize.sync({ alter: false })
    .then(() => {
        console.log('✓ Conexión a base de datos establecida correctamente');
        app.listen(PORT, () => {
            console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('✗ Error al conectar con la base de datos:', err);
    });

module.exports = app;
