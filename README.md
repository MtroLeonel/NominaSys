# 📋 Sistema de Gestión de Nómina

Sistema completo de gestión de nómina empresarial desarrollado con Node.js, Express.js y Sequelize ORM. Soporta múltiples bases de datos (PostgreSQL y SQL Server/MSSQL) con una arquitectura MVC limpia y escalable.

## 🎯 Características Principales

- ✅ **Gestión de Empleados**: Alta, baja y modificación de empleados con CURP único
- ✅ **Departamentos y Puestos**: Organización jerárquica de la empresa
- ✅ **Asignaciones**: Relación entre empleados, departamentos y puestos
- ✅ **Cálculo de Nómina**: Periodos quincenales con cálculo automático de salarios
- ✅ **Sistema de Bonos**: Bonos en porcentaje o monto fijo
- ✅ **Bitácora de Cambios**: Auditoría completa de modificaciones
- ✅ **Interfaz Web Intuitiva**: Diseño moderno con Bulma CSS
- ✅ **Multi-Base de Datos**: Soporte para PostgreSQL y SQL Server

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **Node.js** | Runtime de JavaScript |
| **Express.js 5** | Framework web |
| **Sequelize 6** | ORM para bases de datos |
| **pg / pg-hstore / Tedious** | Drivers de base de datos |
| **EJS** | Motor de plantillas |
| **Bulma CSS** | Framework CSS |
| **dotenv** | Variables de entorno |
| **express-ejs-layouts** | Layouts para EJS |
| **Nodemon** | Auto-recarga en desarrollo |

## 📋 Requisitos Previos

Antes de instalar, asegúrate de tener:

- **Node.js** v14 o superior ([Descargar](https://nodejs.org/))
- **npm** v6 o superior (viene con Node.js)
- **Base de datos** (una de las siguientes):
  - **PostgreSQL** v13 o superior ([Descargar](https://www.postgresql.org/download/))
  - **SQL Server** 2016 o superior ([Descargar](https://www.microsoft.com/sql-server/))

## 🚀 Instalación

### 1. Clonar o descargar el proyecto

```bash
cd practicanomina
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar base de datos

#### Opción A: PostgreSQL

1. Crear la base de datos:
```sql
CREATE DATABASE practicanomina;
```

2. Crear archivo `.env` en la raíz del proyecto:
```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Configuración de PostgreSQL
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=practicanomina
```

#### Opción B: SQL Server

1. Crear la base de datos:
```sql
CREATE DATABASE practicanomina;
```

2. Crear archivo `.env` en la raíz del proyecto:
```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Configuración de SQL Server
DB_DIALECT=mssql
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=tu_contraseña
DB_NAME=practicanomina
```

### 4. Inicializar base de datos con datos de prueba

```bash
npm run seed
```

Este comando creará todas las tablas y añadirá datos de ejemplo:
- 1 usuario administrador
- 2 departamentos (TI, Ventas)
- 2 puestos (Senior Dev, Ejecutiva de Ventas)
- 2 empleados con sus asignaciones
- 1 bono de puntualidad
- 1 periodo de nómina con entradas

### 5. Iniciar la aplicación

**Modo desarrollo** (con auto-recarga):
```bash
npm run dev
```

**Modo producción**:
```bash
npm start
```

La aplicación estará disponible en: **http://localhost:3000**

## 📁 Estructura del Proyecto

```
practicanomina/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración multi-DB
│   ├── controllers/
│   │   ├── indexController.js   # Página principal
│   │   ├── employeeController.js   # Gestión de empleados
│   │   ├── departmentController.js # Gestión de departamentos
│   │   ├── positionController.js   # Gestión de puestos
│   │   ├── payrollController.js    # Gestión de nómina
│   │   ├── bonusController.js      # Gestión de bonos
│   │   └── bitacoraController.js   # Auditoría y logs
│   ├── models/
│   │   ├── index.js             # Inicialización de Sequelize
│   │   ├── employee.js          # Modelo de empleados
│   │   ├── department.js        # Modelo de departamentos
│   │   ├── position.js          # Modelo de puestos
│   │   ├── assignment.js        # Asignaciones emp-dept-puesto
│   │   ├── payrollPeriod.js     # Periodos de nómina
│   │   ├── payrollEntry.js      # Entradas de nómina
│   │   ├── bonus.js             # Bonos
│   │   ├── changeLog.js         # Bitácora de cambios
│   │   └── user.js              # Usuarios del sistema
│   ├── routes/
│   │   ├── index.js             # Rutas principales
│   │   ├── employees.js         # Rutas de empleados
│   │   ├── departments.js       # Rutas de departamentos
│   │   ├── positions.js         # Rutas de puestos
│   │   ├── payroll.js           # Rutas de nómina
│   │   ├── bonuses.js           # Rutas de bonos
│   │   └── bitacora.js          # Rutas de bitácora
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.ejs         # Layout principal
│   │   ├── partials/
│   │   │   ├── header.ejs       # Navegación
│   │   │   └── footer.ejs       # Pie de página
│   │   ├── employees/           # Vistas de empleados
│   │   ├── departments/         # Vistas de departamentos
│   │   ├── positions/           # Vistas de puestos
│   │   ├── payroll/             # Vistas de nómina
│   │   ├── bonuses/             # Vistas de bonos
│   │   ├── bitacora/            # Vistas de bitácora
│   │   ├── index.ejs            # Página principal
│   │   └── error.ejs            # Página de error
│   ├── public/
│   │   ├── css/
│   │   │   └── styles.css       # Estilos personalizados
│   │   └── js/
│   │       └── main.js          # Scripts del cliente
│   ├── app.js                   # Aplicación Express
│   └── seed.js                  # Script de inicialización
├── .env                         # Variables de entorno (NO SUBIR A GIT)
├── .gitignore                   # Archivos ignorados por Git
├── package.json                 # Dependencias y scripts
└── README.md                    # Esta documentación
```

## 🗄️ Modelos de Base de Datos

### Employee (Empleados)
```javascript
{
  firstName: String(80),      // Nombre(s)
  lastName: String(120),      // Apellidos
  curp: String(18),           // CURP único
  hireDate: Date,             // Fecha de contratación
  dailySalary: Decimal(12,2), // Salario diario
  status: Enum('activo', 'inactivo')
}
```

### Department (Departamentos)
```javascript
{
  name: String(100),    // Nombre del departamento
  code: String(10),     // Código corto
  status: Enum('activo', 'inactivo')
}
```

### Position (Puestos)
```javascript
{
  name: String(100),        // Nombre del puesto
  level: String(50),        // Nivel (Jr, Mid, Sr)
  baseSalary: Decimal(12,2),// Salario base
  status: Enum('activo', 'inactivo')
}
```

### Assignment (Asignaciones)
```javascript
{
  employeeId: FK,           // Empleado
  departmentId: FK,         // Departamento
  positionId: FK,           // Puesto
  dailySalary: Decimal(12,2),// Salario diario asignado
  startDate: Date,          // Fecha de inicio
  endDate: Date             // Fecha de fin (opcional)
}
```

### PayrollPeriod (Periodos de Nómina)
```javascript
{
  type: Enum('semanal', 'quincenal', 'mensual'),
  startDate: Date,
  endDate: Date,
  status: Enum('abierto', 'cerrado', 'pagado')
}
```

### PayrollEntry (Entradas de Nómina)
```javascript
{
  payrollPeriodId: FK,
  employeeId: FK,
  basePay: Decimal(12,2),      // Pago base
  bonuses: Decimal(12,2),      // Total de bonos
  deductions: Decimal(12,2),   // Deducciones
  netPay: Decimal(12,2)        // Pago neto
}
```

### Bonus (Bonos)
```javascript
{
  name: String(100),
  amountType: Enum('percent', 'fixed'),
  amount: Decimal(12,2),
  active: Boolean
}
```

### ChangeLog (Bitácora)
```javascript
{
  employeeId: FK,
  changeType: String(50),
  oldValue: Text,
  newValue: Text,
  changedAt: DateTime
}
```

## 🌐 Rutas y Funcionalidades

### Página Principal
- **GET /** - Dashboard principal

### Empleados
- **GET /empleados** - Lista de empleados
- **GET /empleados/nuevo** - Formulario de nuevo empleado
- **POST /empleados** - Crear empleado

### Departamentos
- **GET /departamentos** - Lista de departamentos
- **GET /departamentos/nuevo** - Formulario de nuevo departamento
- **POST /departamentos** - Crear departamento

### Puestos
- **GET /puestos** - Lista de puestos
- **GET /puestos/nuevo** - Formulario de nuevo puesto
- **POST /puestos** - Crear puesto

### Nómina
- **GET /payroll** - Lista de periodos de nómina
- **GET /payroll/nuevo** - Formulario de nuevo periodo
- **POST /payroll** - Crear periodo de nómina

### Bonos
- **GET /bonos** - Lista de bonos
- **GET /bonos/nuevo** - Formulario de nuevo bono
- **POST /bonos** - Crear bono

### Bitácora
- **GET /bitacora** - Lista de cambios registrados

## 📝 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Iniciar | `npm start` | Inicia el servidor en modo producción |
| Desarrollo | `npm run dev` | Inicia con Nodemon (auto-recarga) |
| Seed | `npm run seed` | Inicializa la BD con datos de prueba |
| Test | `npm test` | Ejecuta tests (por implementar) |

## 🎨 Uso de la Aplicación

### 1. Dashboard Principal
Al acceder a http://localhost:3000 verás el dashboard con acceso a todos los módulos.

### 2. Gestión de Empleados

**Crear un empleado:**
1. Click en "Empleados" en el menú
2. Click en "Nuevo Empleado"
3. Llenar el formulario:
   - Nombre(s)
   - Apellidos
   - CURP (18 caracteres)
   - Fecha de contratación
   - Salario diario
4. Click en "Guardar"

**Ver lista de empleados:**
- Muestra todos los empleados con su información
- Filtro de búsqueda disponible
- Estado activo/inactivo

### 3. Gestión de Departamentos

**Crear departamento:**
1. Click en "Departamentos"
2. Click en "Nuevo Departamento"
3. Ingresar:
   - Nombre del departamento
   - Código (máx. 10 caracteres)
4. Guardar

### 4. Gestión de Puestos

**Crear puesto:**
1. Click en "Puestos"
2. Click en "Nuevo Puesto"
3. Ingresar:
   - Nombre del puesto
   - Nivel (Jr, Mid, Sr, etc.)
   - Salario base
4. Guardar

### 5. Calcular Nómina

**Crear periodo de nómina:**
1. Click en "Nómina"
2. Click en "Nuevo Periodo"
3. Seleccionar:
   - Tipo (semanal, quincenal, mensual)
   - Fecha de inicio
   - Fecha de fin
4. El sistema automáticamente:
   - Calcula días trabajados
   - Aplica bonos activos
   - Genera entradas para cada empleado activo
   - Calcula pago neto

### 6. Sistema de Bonos

Los bonos pueden ser:
- **Porcentaje**: Se aplica sobre el salario base (ej: 5% de bono de puntualidad)
- **Monto fijo**: Cantidad fija que se suma (ej: $500 de bono de despensa)

Solo los bonos marcados como "activos" se aplican en la nómina.

### 7. Bitácora de Cambios

Registra automáticamente:
- Cambios en datos de empleados
- Creación de registros
- Modificaciones de asignaciones
- Usuario y fecha de cada cambio

## ⚙️ Configuración Avanzada

### Variables de Entorno

Todas las variables disponibles en `.env`:

```env
# Servidor
PORT=3000                    # Puerto del servidor (default: 3000)
NODE_ENV=development         # Ambiente: development, test, production

# Base de Datos
DB_DIALECT=postgres         # Dialecto: postgres o mssql
DB_HOST=localhost           # Host de la base de datos
DB_PORT=5432                # Puerto (5432 para PostgreSQL, 1433 para MSSQL)
DB_USER=postgres            # Usuario de la base de datos
DB_PASSWORD=password        # Contraseña
DB_NAME=practicanomina      # Nombre de la base de datos

# Opcional: Logging
DB_LOGGING=true             # true para ver queries SQL en consola
```

### Cambiar Base de Datos

Para cambiar de PostgreSQL a SQL Server (o viceversa):

1. Actualizar `DB_DIALECT` en `.env`:
  - `postgres` para PostgreSQL
   - `mssql` para SQL Server

2. Actualizar puerto si es necesario:
  - PostgreSQL: `DB_PORT=5432`
   - MSSQL: `DB_PORT=1433`

3. Reiniciar el servidor:
```bash
npm run dev
```

### Modo Producción

Para desplegar en producción:

1. Crear archivo `.env` con configuración de producción:
```env
NODE_ENV=production
PORT=80
DB_DIALECT=postgres
DB_HOST=tu-servidor-db.com
DB_USER=usuario_produccion
DB_PASSWORD=contraseña_segura
DB_NAME=nomina_prod
```

2. Instalar solo dependencias de producción:
```bash
npm install --production
```

3. Iniciar con PM2 (recomendado):
```bash
npm install -g pm2
pm2 start src/app.js --name "nomina-app"
pm2 save
```

## 🐛 Solución de Problemas

### Error: "Cannot find module 'dotenv'"
```bash
npm install
```

### Error: "Connection refused" o "Unable to connect to database"

**Verificar:**
1. La base de datos está corriendo
2. Las credenciales en `.env` son correctas
3. El puerto es el correcto (5432 para PostgreSQL, 1433 para MSSQL)
4. El firewall permite la conexión

**Para PostgreSQL:**
```bash
# Verificar que PostgreSQL está corriendo (Windows)
sc query postgresql-x64-16
```

**Para SQL Server:**
```bash
# Verificar servicio en Windows
sc query MSSQLSERVER
```

### Error: "Port 3000 already in use"

Cambiar el puerto en `.env`:
```env
PORT=3001
```

### La aplicación no recarga automáticamente en desarrollo

Asegúrate de usar:
```bash
npm run dev
```
(No `npm start`)

### Error: "SequelizeConnectionError"

1. Verificar que la base de datos existe
2. Verificar credenciales
3. Para PostgreSQL, verificar que el usuario tiene permisos:
```sql
GRANT ALL PRIVILEGES ON DATABASE practicanomina TO usuario;
```

### Datos de prueba no se crean

Ejecutar el seed con la base de datos vacía:
```bash
npm run seed
```

Si hay datos previos, el seed los eliminará y creará nuevos (usa force: true).

## 👥 Datos de Prueba (Seed)

El script de seed crea:

**Usuario:**
- Email: admin@sigch.local
- Password: changeme
- Rol: admin

**Departamentos:**
- TI (código: TI)
- Ventas (código: VEN)

**Puestos:**
- Senior Dev (Sr, $1,200/día)
- Ejecutiva de Ventas (Mid, $800/día)

**Empleados:**
- Juan Pérez (Senior Dev en TI)
- María López (Ejecutiva de Ventas)

**Bonos:**
- Bono de puntualidad (5% del salario)

**Periodo de Nómina:**
- Quincenal: 01/02/2024 - 15/02/2024
- Con entradas para ambos empleados

## 📄 Licencia

ISC

## 👨‍💻 Autor

Proyecto académico - CESUN Universidad
Análisis de Requerimientos - 2026

## 🤝 Contribuir

Para contribuir al proyecto:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor:
1. Revisa la sección de "Solución de Problemas"
2. Verifica que todas las dependencias estén instaladas
3. Consulta los logs de la aplicación para más detalles

---

**¡Gracias por usar el Sistema de Gestión de Nómina!** 🎉
