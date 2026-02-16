# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al Sistema de Gestión de Nómina! Esta guía te ayudará a empezar.

## 📋 Antes de Empezar

1. Lee el [README.md](README.md) principal
2. Revisa la [Documentación Técnica](API.md)
3. Configura el proyecto localmente siguiendo [INSTALL.md](INSTALL.md)

## 🔀 Proceso de Contribución

### 1. Fork del Repositorio

Haz un fork del repositorio en GitHub.

### 2. Clonar tu Fork

```bash
git clone https://github.com/tu-usuario/practicanomina.git
cd practicanomina
```

### 3. Crear una Rama

```bash
git checkout -b feature/nombre-descriptivo
```

Tipos de ramas:
- `feature/` - Nueva funcionalidad
- `bugfix/` - Corrección de errores
- `hotfix/` - Corrección urgente
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código

Ejemplos:
```bash
git checkout -b feature/agregar-deducciones
git checkout -b bugfix/calculo-nomina
git checkout -b docs/actualizar-readme
```

### 4. Hacer Cambios

- Escribe código limpio y legible
- Sigue las convenciones de código existentes
- Comenta código complejo
- Actualiza la documentación si es necesario

### 5. Commit de Cambios

Usa mensajes descriptivos siguiendo Conventional Commits:

```bash
git commit -m "feat: agregar módulo de deducciones fiscales"
git commit -m "fix: corregir cálculo de bonos porcentuales"
git commit -m "docs: actualizar guía de instalación"
git commit -m "refactor: optimizar consultas de empleados"
```

Tipos de commits:
- `feat:` - Nueva característica
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Formateo, espacios, etc
- `refactor:` - Refactorización de código
- `test:` - Agregar o modificar tests
- `chore:` - Tareas de mantenimiento

### 6. Push a tu Fork

```bash
git push origin feature/nombre-descriptivo
```

### 7. Crear Pull Request

1. Ve a GitHub
2. Click en "New Pull Request"
3. Describe tus cambios detalladamente
4. Referencia issues relacionados (si aplica)

## 📝 Estándares de Código

### JavaScript

**Indentación**: 2 espacios
```javascript
// ✅ Correcto
function calcularNomina() {
  const basePay = 1000;
  return basePay;
}

// ❌ Incorrecto
function calcularNomina() {
    const basePay = 1000;
    return basePay;
}
```

**Nombres de Variables**: camelCase
```javascript
// ✅ Correcto
const dailySalary = 1000;
const employeeCount = 25;

// ❌ Incorrecto
const daily_salary = 1000;
const EmployeeCount = 25;
```

**Nombres de Funciones**: camelCase descriptivo
```javascript
// ✅ Correcto
async function calculatePayrollForPeriod(periodId) { }

// ❌ Incorrecto
async function calc(id) { }
```

**Constantes**: UPPER_SNAKE_CASE
```javascript
// ✅ Correcto
const MAX_SALARY = 10000;
const TAX_RATE = 0.16;

// ❌ Incorrecto
const maxSalary = 10000;
const taxRate = 0.16;
```

### Estructuras de Control

**Usar async/await**
```javascript
// ✅ Correcto
async function getEmployees() {
  try {
    const employees = await db.Employee.findAll();
    return employees;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ❌ Incorrecto (callbacks)
function getEmployees(callback) {
  db.Employee.findAll((err, employees) => {
    if (err) callback(err);
    callback(null, employees);
  });
}
```

### Manejo de Errores

**Siempre usar try-catch en funciones async**
```javascript
// ✅ Correcto
exports.create = async (req, res, next) => {
  try {
    const employee = await db.Employee.create(req.body);
    res.redirect('/empleados');
  } catch (err) {
    next(err); // Pasar al middleware de errores
  }
};

// ❌ Incorrecto
exports.create = async (req, res) => {
  const employee = await db.Employee.create(req.body);
  res.redirect('/empleados');
};
```

### Modelos Sequelize

**Estructura estándar**
```javascript
module.exports = (sequelize, DataTypes) => {
  const ModelName = sequelize.define('ModelName', {
    // Campos
    fieldName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    // Opciones
    tableName: 'TableName',
    timestamps: true
  });

  // Asociaciones
  ModelName.associate = (models) => {
    // Relaciones
  };

  return ModelName;
};
```

### Controllers

**Estructura estándar**
```javascript
const db = require('../models');

module.exports = {
  // Listar todos
  list: async (req, res, next) => {
    try {
      const items = await db.Model.findAll();
      res.render('path/list', { items });
    } catch (err) {
      next(err);
    }
  },

  // Mostrar formulario
  newForm: async (req, res, next) => {
    try {
      res.render('path/new');
    } catch (err) {
      next(err);
    }
  },

  // Crear
  create: async (req, res, next) => {
    try {
      await db.Model.create(req.body);
      res.redirect('/path');
    } catch (err) {
      next(err);
    }
  }
};
```

### Rutas

**Estructura estándar**
```javascript
const express = require('express');
const router = express.Router();
const controller = require('../controllers/modelController');

// Rutas
router.get('/', controller.list);
router.get('/nuevo', controller.newForm);
router.post('/', controller.create);

module.exports = router;
```

## 🎨 Vistas EJS

### Estructura de Vista

```ejs
<!-- Título de la página -->
<h1 class="title">Título</h1>

<!-- Contenido -->
<div class="box">
  <!-- Usar clases de Bulma -->
</div>

<!-- Formularios -->
<form method="POST" action="/ruta">
  <div class="field">
    <label class="label">Campo</label>
    <div class="control">
      <input class="input" type="text" name="campo" required>
    </div>
  </div>
  
  <button class="button is-primary" type="submit">Guardar</button>
</form>
```

## 🧪 Testing (Recomendado)

Si agregas funcionalidad nueva, considera agregar tests:

```javascript
// tests/employees.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Empleados', () => {
  test('GET /empleados debe retornar 200', async () => {
    const response = await request(app).get('/empleados');
    expect(response.statusCode).toBe(200);
  });

  test('POST /empleados debe crear empleado', async () => {
    const newEmployee = {
      firstName: 'Test',
      lastName: 'User',
      curp: 'TEUS900101HDFRRN09',
      hireDate: '2024-01-01',
      dailySalary: 1000
    };

    const response = await request(app)
      .post('/empleados')
      .send(newEmployee);

    expect(response.statusCode).toBe(302); // Redirect
  });
});
```

## 📚 Documentación

### Actualizar Documentación

Si agregas funcionalidades, actualiza:

1. **README.md** - Si cambia la instalación o uso general
2. **API.md** - Si agregas rutas o modelos
3. **INSTALL.md** - Si cambia el proceso de instalación
4. Comentarios en el código

### Documentar Código

```javascript
/**
 * Calcula el pago total de un empleado para un periodo
 * @param {number} employeeId - ID del empleado
 * @param {number} periodId - ID del periodo de nómina
 * @returns {Promise<number>} Pago total calculado
 */
async function calculatePayroll(employeeId, periodId) {
  // Implementación...
}
```

## 🐛 Reportar Bugs

### Antes de Reportar

1. Verifica que no exista un issue similar
2. Asegúrate de estar usando la última versión
3. Intenta reproducir el error

### Información a Incluir

```markdown
**Descripción del bug**
Descripción clara del problema

**Pasos para reproducir**
1. Ir a '...'
2. Click en '...'
3. Ver error

**Comportamiento esperado**
Lo que debería suceder

**Capturas de pantalla**
Si aplica

**Entorno**
- OS: Windows 11
- Node.js: v18.0.0
- Base de datos: MySQL 8.0
- Navegador: Chrome 120
```

## ✨ Sugerir Funcionalidades

### Formato de Sugerencia

```markdown
**Descripción de la funcionalidad**
Descripción clara de lo que quieres agregar

**¿Por qué es útil?**
Explicar el beneficio

**Alternativas consideradas**
Otras formas de resolver el problema

**Contexto adicional**
Cualquier otra información relevante
```

## ✅ Checklist de Pull Request

Antes de enviar tu PR, verifica:

- [ ] El código sigue los estándares del proyecto
- [ ] Los cambios funcionan correctamente
- [ ] No hay errores en consola
- [ ] La documentación está actualizada
- [ ] Los mensajes de commit son descriptivos
- [ ] No hay conflictos con la rama main
- [ ] Se probó en desarrollo (npm run dev)
- [ ] No se subieron credenciales o datos sensibles
- [ ] El archivo .env no está incluido

## 🎯 Áreas de Contribución

### Funcionalidades Sugeridas

- [ ] Módulo de deducciones fiscales (ISR, IMSS)
- [ ] Exportación de nómina a PDF/Excel
- [ ] Gráficas y reportes estadísticos
- [ ] Sistema de autenticación y roles
- [ ] API REST para integración externa
- [ ] Histórico de salarios de empleados
- [ ] Notificaciones por email
- [ ] Dashboard con KPIs
- [ ] Módulo de vacaciones y permisos
- [ ] Cálculo de aguinaldo y PTU

### Mejoras Técnicas

- [ ] Agregar tests unitarios
- [ ] Implementar validación de formularios
- [ ] Optimización de consultas SQL
- [ ] Agregar caché (Redis)
- [ ] Implementar rate limiting
- [ ] Dockerización del proyecto
- [ ] CI/CD con GitHub Actions
- [ ] Logging avanzado (Winston)
- [ ] Monitoreo de errores (Sentry)
- [ ] Documentación con JSDoc

## 📞 Contacto

Si tienes preguntas sobre cómo contribuir:

1. Abre un issue con la etiqueta "question"
2. Revisa la documentación existente
3. Consulta con el equipo de desarrollo

## 📄 Código de Conducta

### Compromiso

Nos comprometemos a hacer de este proyecto una experiencia libre de acoso para todos.

### Comportamiento Esperado

- Usar lenguaje acogedor e inclusivo
- Respetar puntos de vista diferentes
- Aceptar críticas constructivas
- Enfocarse en lo mejor para la comunidad
- Mostrar empatía hacia otros

### Comportamiento Inaceptable

- Uso de lenguaje o imágenes sexualizadas
- Comentarios insultantes o despectivos
- Acoso público o privado
- Publicar información privada de otros
- Conducta no profesional

## 🙏 Reconocimientos

Tu contribución será reconocida en:
- Lista de contribuidores
- Notas de versión
- Agradecimientos en documentación

---

**¡Gracias por contribuir!** 🎉

Tu trabajo hace que este proyecto sea mejor para todos.
