# 📖 Documentación Técnica - API Interna

Esta documentación es para desarrolladores que necesitan entender y trabajar con el código del sistema.

## 🏗️ Arquitectura

El sistema sigue el patrón **MVC (Model-View-Controller)**:

```
Cliente (Navegador)
    ↓
Routes (Enrutamiento)
    ↓
Controllers (Lógica de negocio)
    ↓
Models (Sequelize ORM)
    ↓
Base de Datos (PostgreSQL)
```

## 📂 Estructura de Carpetas

### `/src/models/`
Modelos de Sequelize que representan las tablas de la base de datos.

### `/src/controllers/`
Controladores que manejan la lógica de negocio.

### `/src/routes/`
Definición de rutas HTTP y su mapeo a controladores.

### `/src/views/`
Plantillas EJS para renderizar HTML.

### `/src/config/`
Configuraciones de la aplicación (base de datos, etc.).

## 🔌 Endpoints Disponibles

## 🌐 Web vs API

El proyecto ahora expone dos capas:

- **Rutas Web (vistas EJS)**: Devuelven HTML para navegador
- **Rutas API (`/api`)**: Devuelven JSON para Postman o frontend externo

## 🛡️ Configuración CORS

La API usa `cors` con una lista blanca de orígenes definida por variable de entorno.

### Variable de entorno

```env
CORS_ORIGINS=https://nominasys.fly.dev,http://localhost:*,http://127.0.0.1:*
```

### Comportamiento

- Solo los orígenes incluidos en `CORS_ORIGINS` pueden consumir la API desde navegador.
- Requests sin header `Origin` (por ejemplo Postman o curl) están permitidos.
- Si un origen no está en lista blanca, el servidor responde con error de CORS.
- Se admite wildcard `*` en puertos para desarrollo local (ej: `http://localhost:*`).

### Recomendación para despliegues

- Mantener `CORS_ORIGINS` diferente por ambiente (`development`, `staging`, `production`).
- Evitar hardcodear dominios en el código; configurar siempre desde `.env`.
- En Fly, definir `CORS_ORIGINS` como variable/secreto del runtime (`fly secrets set`), ya que `.env` no se copia al contenedor.

---

## 🔐 Autenticación API (JWT)

### `POST /api/auth/login`
- **Descripción**: Inicia sesión y genera token JWT
- **Body**:
```json
{
  "email": "admin@sigch.local",
  "password": "changeme"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "<jwt>",
  "user": {
    "id": 1,
    "email": "admin@sigch.local",
    "role": "admin"
  }
}
```

### Header requerido en rutas protegidas
```http
Authorization: Bearer <jwt>
```

---

## 🧩 Endpoints API JSON (`/api`)

> Excepto `/api/auth/login` y `/api/health`, todos requieren JWT.

### `GET /api/health`
- Verifica que la API esté operativa.

### Empleados
- `GET /api/empleados`
- `POST /api/empleados`

### Departamentos
- `GET /api/departamentos`
- `POST /api/departamentos`

### Puestos
- `GET /api/puestos`
- `POST /api/puestos`

### Nómina
- `GET /api/payroll`
- `POST /api/payroll`

### Bonos
- `GET /api/bonos`
- `POST /api/bonos`

### Bitácora
- `GET /api/bitacora`

---

### Página Principal

#### `GET /`
- **Controlador**: `indexController.home`
- **Vista**: `index.ejs`
- **Descripción**: Muestra el dashboard principal

---

### Empleados (`/empleados`)

#### `GET /empleados`
- **Controlador**: `employeeController.list`
- **Vista**: `employees/list.ejs`
- **Descripción**: Lista todos los empleados
- **Query params**: 
  - `status` (opcional): `activo` | `inactivo`

#### `GET /empleados/nuevo`
- **Controlador**: `employeeController.newForm`
- **Vista**: `employees/new.ejs`
- **Descripción**: Muestra formulario para crear empleado

#### `POST /empleados`
- **Controlador**: `employeeController.create`
- **Body**:
```javascript
{
  firstName: String,
  lastName: String,
  curp: String(18),
  hireDate: Date (YYYY-MM-DD),
  dailySalary: Number
}
```
- **Redirect**: `/empleados`
- **Descripción**: Crea un nuevo empleado

---

### Departamentos (`/departamentos`)

#### `GET /departamentos`
- **Controlador**: `departmentController.list`
- **Vista**: `departments/list.ejs`
- **Descripción**: Lista todos los departamentos

#### `GET /departamentos/nuevo`
- **Controlador**: `departmentController.newForm`
- **Vista**: `departments/new.ejs`
- **Descripción**: Muestra formulario para crear departamento

#### `POST /departamentos`
- **Controlador**: `departmentController.create`
- **Body**:
```javascript
{
  name: String(100),
  code: String(10)
}
```
- **Redirect**: `/departamentos`
- **Descripción**: Crea un nuevo departamento

---

### Puestos (`/puestos`)

#### `GET /puestos`
- **Controlador**: `positionController.list`
- **Vista**: `positions/list.ejs`
- **Descripción**: Lista todos los puestos

#### `GET /puestos/nuevo`
- **Controlador**: `positionController.newForm`
- **Vista**: `positions/new.ejs`
- **Descripción**: Muestra formulario para crear puesto

#### `POST /puestos`
- **Controlador**: `positionController.create`
- **Body**:
```javascript
{
  name: String(100),
  level: String(50),
  baseSalary: Number
}
```
- **Redirect**: `/puestos`
- **Descripción**: Crea un nuevo puesto

---

### Nómina (`/payroll`)

#### `GET /payroll`
- **Controlador**: `payrollController.list`
- **Vista**: `payroll/list.ejs`
- **Descripción**: Lista todos los periodos de nómina

#### `GET /payroll/nuevo`
- **Controlador**: `payrollController.newForm`
- **Vista**: `payroll/new.ejs`
- **Descripción**: Muestra formulario para crear periodo

#### `POST /payroll`
- **Controlador**: `payrollController.create`
- **Body**:
```javascript
{
  type: 'semanal' | 'quincenal' | 'mensual',
  startDate: Date (YYYY-MM-DD),
  endDate: Date (YYYY-MM-DD)
}
```
- **Redirect**: `/payroll`
- **Descripción**: Crea periodo de nómina y genera entradas para empleados activos

---

### Bonos (`/bonos`)

#### `GET /bonos`
- **Controlador**: `bonusController.list`
- **Vista**: `bonuses/list.ejs`
- **Descripción**: Lista todos los bonos

#### `GET /bonos/nuevo`
- **Controlador**: `bonusController.newForm`
- **Vista**: `bonuses/new.ejs`
- **Descripción**: Muestra formulario para crear bono

#### `POST /bonos`
- **Controlador**: `bonusController.create`
- **Body**:
```javascript
{
  name: String(100),
  amountType: 'percent' | 'fixed',
  amount: Number,
  active: Boolean
}
```
- **Redirect**: `/bonos`
- **Descripción**: Crea un nuevo bono

---

### Bitácora (`/bitacora`)

#### `GET /bitacora`
- **Controlador**: `bitacoraController.list`
- **Vista**: `bitacora/list.ejs`
- **Descripción**: Lista el historial de cambios
- **Query params**:
  - `employeeId` (opcional): Filtrar por empleado
  - `limit` (opcional): Limitar resultados (default: 100)

---

## 🗃️ Modelos y Relaciones

### Employee ↔ Assignment
```javascript
Employee.hasMany(Assignment, { foreignKey: 'employeeId' })
Assignment.belongsTo(Employee, { foreignKey: 'employeeId' })
```

### Department ↔ Assignment
```javascript
Department.hasMany(Assignment, { foreignKey: 'departmentId' })
Assignment.belongsTo(Department, { foreignKey: 'departmentId' })
```

### Position ↔ Assignment
```javascript
Position.hasMany(Assignment, { foreignKey: 'positionId' })
Assignment.belongsTo(Position, { foreignKey: 'positionId' })
```

### Employee ↔ PayrollEntry
```javascript
Employee.hasMany(PayrollEntry, { foreignKey: 'employeeId' })
PayrollEntry.belongsTo(Employee, { foreignKey: 'employeeId' })
```

### PayrollPeriod ↔ PayrollEntry
```javascript
PayrollPeriod.hasMany(PayrollEntry, { foreignKey: 'payrollPeriodId' })
PayrollEntry.belongsTo(PayrollPeriod, { foreignKey: 'payrollPeriodId' })
```

### Employee ↔ ChangeLog
```javascript
Employee.hasMany(ChangeLog, { foreignKey: 'employeeId' })
ChangeLog.belongsTo(Employee, { foreignKey: 'employeeId' })
```

## 🔧 Funciones Auxiliares

### Cálculo de Nómina

Cuando se crea un periodo de nómina, el sistema automáticamente:

1. **Busca empleados activos** con asignaciones vigentes
2. **Calcula días trabajados** según el tipo de periodo:
   - Semanal: 7 días
   - Quincenal: 15 días
   - Mensual: 30 días
3. **Calcula salario base**: `dailySalary * daysWorked`
4. **Aplica bonos activos**:
   - Porcentaje: `basePay * (bonus.amount / 100)`
   - Fijo: `bonus.amount`
5. **Calcula pago neto**: `basePay + bonuses - deductions`

### Bitácora Automática

El sistema registra automáticamente en la bitácora:
- Creación de empleados
- Modificación de datos
- Cambios en asignaciones
- Cambios en salarios

## 🎨 Vistas y Layouts

### Layout Principal
**Archivo**: `views/layouts/main.ejs`

Todas las vistas heredan del layout principal que incluye:
- Header con navegación (Bulma CSS)
- Área de contenido dinámico
- Footer

### Partials

#### Header
**Archivo**: `views/partials/header.ejs`
- Barra de navegación principal
- Links a todos los módulos

#### Footer
**Archivo**: `views/partials/footer.ejs`
- Información de copyright
- Links adicionales

## 📦 Middleware

### express.json()
Parsea el body de las peticiones como JSON.

### express.urlencoded({ extended: true })
Parsea datos de formularios.

### express.static()
Sirve archivos estáticos desde `/public`.

### express-ejs-layouts
Maneja layouts para vistas EJS.

## 🔐 Manejo de Errores

### Error 404
**Vista**: `views/error.ejs`
- Se muestra cuando una ruta no existe

### Error 500
**Vista**: `views/error.ejs`
- Se muestra cuando hay un error del servidor
- En desarrollo, muestra el stack trace
- En producción, oculta detalles sensibles

## 🧪 Desarrollo

### Hot Reload
```bash
npm run dev
```
Nodemon observa cambios en archivos `.js` y reinicia automáticamente.

### Logs SQL
Para ver las queries SQL en consola:

```javascript
// src/config/database.js
logging: console.log  // desarrollo
logging: false        // producción
```

O en `.env`:
```env
DB_LOGGING=true
```

## 🚀 Extender la Aplicación

### Agregar un nuevo modelo

1. Crear archivo en `/src/models/nuevoModelo.js`:
```javascript
module.exports = (sequelize, DataTypes) => {
  const NuevoModelo = sequelize.define('NuevoModelo', {
    // campos...
  });
  
  NuevoModelo.associate = (models) => {
    // relaciones...
  };
  
  return NuevoModelo;
};
```

2. El modelo se cargará automáticamente por `/src/models/index.js`

### Agregar una nueva ruta

1. Crear controlador en `/src/controllers/nuevoController.js`:
```javascript
const db = require('../models');

module.exports = {
  list: async (req, res, next) => {
    try {
      const items = await db.NuevoModelo.findAll();
      res.render('nuevo/list', { items });
    } catch (err) {
      next(err);
    }
  }
};
```

2. Crear archivo de rutas en `/src/routes/nuevo.js`:
```javascript
const express = require('express');
const router = express.Router();
const controller = require('../controllers/nuevoController');

router.get('/', controller.list);

module.exports = router;
```

3. Registrar en `/src/app.js`:
```javascript
const nuevoRoutes = require('./routes/nuevo');
app.use('/nuevo', nuevoRoutes);
```

4. Crear vistas en `/src/views/nuevo/`

### Agregar validación

Puedes usar librerías como:
- **express-validator**: Validación de datos
- **joi**: Schemas de validación

Ejemplo con express-validator:
```bash
npm install express-validator
```

```javascript
const { body, validationResult } = require('express-validator');

router.post('/empleados',
  body('curp').isLength({ min: 18, max: 18 }),
  body('firstName').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // continuar...
  }
);
```

## 🔒 Seguridad

### Recomendaciones para Producción

1. **Variables de entorno**: Nunca subir `.env` a Git
2. **Validación**: Validar todos los inputs del usuario
3. **SQL Injection**: Sequelize previene esto automáticamente
4. **XSS**: EJS escapa HTML por defecto
5. **CORS**: Configurar si necesitas APIs públicas
6. **Rate Limiting**: Implementar para prevenir ataques
7. **Helmet**: Agregar headers de seguridad

Ejemplo con Helmet:
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

## 📈 Rendimiento

### Optimizaciones

1. **Eager Loading**: Cargar relaciones necesarias de una vez
```javascript
const employees = await db.Employee.findAll({
  include: [db.Assignment, db.Department]
});
```

2. **Índices**: Asegurar índices en columnas frecuentemente consultadas
```javascript
curp: {
  type: DataTypes.STRING(18),
  unique: true,  // Crea índice único
}
```

3. **Paginación**: Para listas grandes
```javascript
const { limit, offset } = req.query;
const employees = await db.Employee.findAll({
  limit: parseInt(limit) || 10,
  offset: parseInt(offset) || 0
});
```

4. **Caching**: Usar Redis para datos frecuentes

## 🧪 Testing (Por Implementar)

Estructura sugerida:
```bash
npm install --save-dev jest supertest
```

```javascript
// tests/employees.test.js
const request = require('supertest');
const app = require('../src/app');

describe('GET /empleados', () => {
  it('should return employees list', async () => {
    const res = await request(app).get('/empleados');
    expect(res.statusCode).toBe(200);
  });
});
```

## 📚 Recursos Adicionales

- [Express.js Docs](https://expressjs.com/)
- [Sequelize Docs](https://sequelize.org/)
- [EJS Docs](https://ejs.co/)
- [Bulma CSS](https://bulma.io/)

## 📋 Resumen Final de Endpoints API (Método + JSON de Respuesta)

> Base URL sugerida: `http://localhost:3000`

### 1) `POST /api/auth/login`
- **Método**: `POST`
- **Protegido con JWT**: No
- **Respuesta exitosa (200)**:
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "<jwt>",
  "user": {
    "id": 1,
    "email": "admin@sigch.local",
    "role": "admin"
  }
}
```

### 2) `GET /api/health`
- **Método**: `GET`
- **Protegido con JWT**: No
- **Respuesta exitosa (200)**:
```json
{
  "success": true,
  "message": "API operativa"
}
```

### 3) `GET /api/empleados`
- **Método**: `GET`
- **Protegido con JWT**: Sí
- **Respuesta exitosa (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "firstName": "Juan",
      "lastName": "Pérez",
      "curp": "JUAP800101HDFRRN09",
      "hireDate": "2024-01-15",
      "dailySalary": "1200.00",
      "status": "activo",
      "Assignments": []
    }
  ]
}
```

### 4) `POST /api/empleados`
- **Método**: `POST`
- **Protegido con JWT**: Sí
- **Respuesta exitosa (201)**:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "firstName": "Ana",
    "lastName": "García",
    "curp": "AAGA900101MDFRRL09",
    "hireDate": "2026-01-15",
    "dailySalary": "950.00",
    "status": "activo",
    "Assignments": []
  }
}
```

### 5) `GET /api/departamentos`
- **Método**: `GET`
- **Protegido con JWT**: Sí
- **Respuesta exitosa (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "TI",
      "code": "TI",
      "status": "activo"
    }
  ]
}
```

### 6) `POST /api/departamentos`
- **Método**: `POST`
- **Protegido con JWT**: Sí
- **Respuesta exitosa (201)**:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Finanzas",
    "code": "FIN",
    "status": "activo"
  }
}
```

### 7) `GET /api/puestos`
- **Método**: `GET`
- **Protegido con JWT**: Sí
- **Respuesta exitosa (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Senior Dev",
      "level": "Sr",
      "baseSalary": "1200.00",
      "status": "activo"
    }
  ]
}
```

### 8) `POST /api/puestos`
- **Método**: `POST`
- **Protegido con JWT**: Sí
- **Respuesta exitosa (201)**:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Analista",
    "level": "Mid",
    "baseSalary": "900.00",
    "status": "activo"
  }
}
```

### 9) `GET /api/payroll`
- **Método**: `GET`
- **Protegido con JWT**: Sí
- **Respuesta exitosa (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "quincenal",
      "startDate": "2024-02-01",
      "endDate": "2024-02-15",
      "status": "abierto"
    }
  ]
}
```

### 10) `POST /api/payroll`
- **Método**: `POST`
- **Protegido con JWT**: Sí
- **Respuesta exitosa (201)**:
```json
{
  "success": true,
  "data": {
    "id": 2,
    "type": "semanal",
    "startDate": "2026-03-01",
    "endDate": "2026-03-07",
    "status": "abierto"
  }
}
```

### 11) `GET /api/bonos`
- **Método**: `GET`
- **Protegido con JWT**: Sí
- **Respuesta exitosa (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Bono de puntualidad",
      "amountType": "percent",
      "amount": "5.00",
      "active": true
    }
  ]
}
```

### 12) `POST /api/bonos`
- **Método**: `POST`
- **Protegido con JWT**: Sí
- **Respuesta exitosa (201)**:
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Bono de productividad",
    "amountType": "fixed",
    "amount": "750.00",
    "active": true
  }
}
```

### 13) `GET /api/bitacora`
- **Método**: `GET`
- **Protegido con JWT**: Sí
- **Respuesta exitosa (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "employeeId": 1,
      "changedBy": 1,
      "changeType": "salario",
      "previousValue": "1150",
      "newValue": "1200",
      "reason": "Ajuste por desempeño"
    }
  ]
}
```

### Respuesta de error común en endpoints protegidos

#### Sin token (401)
```json
{
  "success": false,
  "message": "Token no proporcionado. Usa Authorization: Bearer <token>"
}
```

#### Token inválido o expirado (403)
```json
{
  "success": false,
  "message": "Token invalido o expirado"
}
```

#### Endpoint no encontrado en API (404)
```json
{
  "success": false,
  "message": "Endpoint no encontrado"
}
```

---

¿Tienes preguntas? Consulta el [README.md](../README.md) principal o revisa el codigo fuente.
