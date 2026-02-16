# 🎨 Arquitectura y Flujo del Sistema

Este documento explica visualmente cómo funciona el sistema de nómina.

## 📐 Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENTE (Navegador)                     │
│                    http://localhost:3000                     │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP Request/Response
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXPRESS.JS SERVER                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    MIDDLEWARES                         │  │
│  │  • express.json()                                     │  │
│  │  • express.urlencoded()                               │  │
│  │  • express.static()                                   │  │
│  │  • express-ejs-layouts                                │  │
│  └───────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                     ROUTES                             │  │
│  │  /                    → index.js                       │  │
│  │  /empleados           → employees.js                   │  │
│  │  /departamentos       → departments.js                 │  │
│  │  /puestos             → positions.js                   │  │
│  │  /payroll             → payroll.js                     │  │
│  │  /bonos               → bonuses.js                     │  │
│  │  /bitacora            → bitacora.js                    │  │
│  └───────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  CONTROLLERS                           │  │
│  │  • indexController.js                                 │  │
│  │  • employeeController.js                              │  │
│  │  • departmentController.js                            │  │
│  │  • positionController.js                              │  │
│  │  • payrollController.js                               │  │
│  │  • bonusController.js                                 │  │
│  │  • bitacoraController.js                              │  │
│  └───────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    MODELS (Sequelize)                  │  │
│  │  • Employee                                           │  │
│  │  • Department                                         │  │
│  │  • Position                                           │  │
│  │  • Assignment                                         │  │
│  │  • PayrollPeriod                                      │  │
│  │  • PayrollEntry                                       │  │
│  │  • Bonus                                              │  │
│  │  • ChangeLog                                          │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ SQL Queries
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  BASE DE DATOS                               │
│              (MySQL / SQL Server)                            │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐         │
│  │Employees│ │Department│ │Positions │ │Bonuses  │         │
│  └─────────┘ └──────────┘ └──────────┘ └─────────┘         │
│  ┌──────────┐ ┌────────────┐ ┌──────────────┐              │
│  │Assignment│ │PayrollEntry│ │PayrollPeriod │              │
│  └──────────┘ └────────────┘ └──────────────┘              │
│  ┌─────────┐ ┌─────┐                                        │
│  │ChangeLog│ │Users│                                        │
│  └─────────┘ └─────┘                                        │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Flujo de Peticiones

### Ejemplo 1: Ver Lista de Empleados

```
1. Usuario hace click en "Empleados"
   │
   ▼
2. Navegador envía: GET /empleados
   │
   ▼
3. Express Router (routes/employees.js)
   │
   ▼
4. employeeController.list()
   │
   ├─► db.Employee.findAll()
   │   │
   │   ▼
   │   Base de datos retorna empleados
   │
   ▼
5. res.render('employees/list', { employees })
   │
   ▼
6. EJS procesa la plantilla
   │
   ├─► layouts/main.ejs (layout principal)
   ├─► partials/header.ejs (navegación)
   ├─► employees/list.ejs (contenido)
   └─► partials/footer.ejs (pie)
   │
   ▼
7. HTML final enviado al navegador
   │
   ▼
8. Usuario ve la lista de empleados
```

### Ejemplo 2: Crear Empleado

```
FASE 1: Mostrar Formulario
─────────────────────────
1. Usuario: Click en "Nuevo Empleado"
   │
   ▼
2. GET /empleados/nuevo
   │
   ▼
3. employeeController.newForm()
   │
   ▼
4. res.render('employees/new')
   │
   ▼
5. Formulario mostrado al usuario

FASE 2: Enviar Datos
────────────────────
6. Usuario: Llena formulario + Submit
   │
   ▼
7. POST /empleados
   │  Body: { firstName, lastName, curp, ... }
   │
   ▼
8. employeeController.create(req, res)
   │
   ├─► Validar datos (req.body)
   │
   ├─► db.Employee.create(req.body)
   │   │
   │   ▼
   │   INSERT INTO Employees ...
   │   │
   │   ▼
   │   Empleado guardado en BD
   │
   ├─► db.ChangeLog.create() [Opcional]
   │   │
   │   ▼
   │   Registro en bitácora
   │
   ▼
9. res.redirect('/empleados')
   │
   ▼
10. Usuario ve lista con nuevo empleado
```

## 🗄️ Relaciones de Base de Datos

```
┌──────────────┐
│   Employee   │
│ ─────────────│         ┌──────────────┐
│ • id (PK)    │◄────────│  Assignment  │
│ • firstName  │   1:N   │──────────────│         ┌─────────────┐
│ • lastName   │         │ • id (PK)    │         │ Department  │
│ • curp       │         │ • employeeId │────────►│─────────────│
│ • dailySalary│         │ • departmentId│   N:1  │ • id (PK)   │
│ • status     │         │ • positionId │         │ • name      │
└──────┬───────┘         │ • startDate  │         │ • code      │
       │                 │ • endDate    │         └─────────────┘
       │                 └──────┬───────┘
       │                        │
       │                        │
       │                        │                  ┌─────────────┐
       │                        └─────────────────►│   Position  │
       │                                      N:1  │─────────────│
       │                                           │ • id (PK)   │
       │                                           │ • name      │
       │                                           │ • level     │
       │                                           │ • baseSalary│
       │                                           └─────────────┘
       │
       │   1:N                  ┌──────────────────┐
       └───────────────────────►│  PayrollEntry    │
                                │──────────────────│
                                │ • id (PK)        │◄───┐
                                │ • employeeId     │    │
                                │ • periodId       │    │
                                │ • basePay        │    │ N:1
                                │ • bonuses        │    │
                                │ • deductions     │    │
                                │ • netPay         │    │
                                └──────────────────┘    │
                                                        │
                                ┌──────────────────────┐│
                                │  PayrollPeriod       ││
                                │──────────────────────││
                                │ • id (PK)            ││
                                │ • type               ││
                                │ • startDate          ││
                                │ • endDate            ││
                                │ • status             ││
                                └──────────────────────┘│
                                                        │
┌──────────────┐                                        │
│   Bonus      │                                        │
│──────────────│                                        │
│ • id (PK)    │                                        │
│ • name       │   Aplicados automáticamente           │
│ • amountType │   al crear PayrollEntry ──────────────┘
│ • amount     │
│ • active     │
└──────────────┘

┌──────────────┐
│  ChangeLog   │   Auditoría automática
│──────────────│   de cambios
│ • id (PK)    │
│ • employeeId │
│ • changeType │
│ • oldValue   │
│ • newValue   │
│ • changedAt  │
└──────────────┘
```

## 💰 Flujo de Cálculo de Nómina

```
INICIO: Usuario crea periodo de nómina
│
├─► Tipo: Quincenal
├─► Inicio: 2026-02-01
└─► Fin: 2026-02-15
    │
    ▼
┌───────────────────────────────────────┐
│  payrollController.create()           │
└───────────────────────────────────────┘
    │
    ▼
1. Crear PayrollPeriod en BD
   │
   ▼
2. Buscar empleados activos con asignaciones
   │
   │  Query: Employee.findAll({
   │    where: { status: 'activo' },
   │    include: Assignment
   │  })
   │
   ▼
3. Para cada empleado:
   │
   ├─► Calcular días trabajados (15 para quincenal)
   │
   ├─► Calcular salario base
   │   basePay = dailySalary × días
   │   Ejemplo: $1,000 × 15 = $15,000
   │
   ├─► Buscar bonos activos
   │   db.Bonus.findAll({ where: { active: true }})
   │
   ├─► Aplicar cada bono:
   │   │
   │   ├─► Si tipo = 'percent':
   │   │   bonus = basePay × (amount / 100)
   │   │   Ejemplo: $15,000 × 5% = $750
   │   │
   │   └─► Si tipo = 'fixed':
   │       bonus = amount
   │       Ejemplo: $500
   │
   ├─► Sumar todos los bonos
   │   totalBonuses = sum(bonos)
   │
   ├─► Calcular deducciones (futuro)
   │   deductions = 0
   │
   ├─► Calcular pago neto
   │   netPay = basePay + bonuses - deductions
   │   Ejemplo: $15,000 + $1,250 - $0 = $16,250
   │
   └─► Crear PayrollEntry
       db.PayrollEntry.create({
         payrollPeriodId,
         employeeId,
         basePay,
         bonuses,
         deductions,
         netPay
       })
   │
   ▼
4. Todas las entradas creadas
   │
   ▼
5. Redirigir a lista de nómina
   │
   ▼
FIN: Usuario ve periodo con todas las entradas generadas
```

## 🎨 Flujo de Renderizado de Vistas

```
┌─────────────────────────────────────────────┐
│  Controller: res.render('path/view', data)  │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│      Express-EJS-Layouts Middleware         │
└────────────────┬────────────────────────────┘
                 │
                 ▼
       ┌─────────────────────┐
       │  views/layouts/     │
       │  main.ejs           │
       │                     │
       │  <!DOCTYPE html>    │
       │  <html>             │
       │    <head>           │
       │      <!-- CSS -->   │
       │    </head>          │
       │    <body>           │
       │                     │
       │      ┌──────────────┼────────────┐
       │      │              │            │
       │      ▼              ▼            ▼
       │  ┌───────┐   ┌──────────┐  ┌────────┐
       │  │header │   │ CONTENT  │  │ footer │
       │  │ .ejs  │   │  (body)  │  │  .ejs  │
       │  └───────┘   └──────────┘  └────────┘
       │                    │
       │                    ▼
       │      ┌──────────────────────────┐
       │      │ views/employees/list.ejs │
       │      │ views/payroll/new.ejs    │
       │      │ etc...                   │
       │      └──────────────────────────┘
       │                     │
       │    </body>          │
       │  </html>            │
       └─────────────────────┼────────────┘
                             │
                             ▼
               ┌──────────────────────────┐
               │    HTML Final + CSS      │
               └──────────────────────────┘
                             │
                             ▼
               ┌──────────────────────────┐
               │   Enviado al Navegador   │
               └──────────────────────────┘
```

## 🔐 Configuración Multi-Base de Datos

```
┌───────────────┐
│  .env file    │
│───────────────│
│ DB_DIALECT=   │ ─┐
│  mysql        │  │
└───────────────┘  │
                   │
┌───────────────┐  │
│ database.js   │◄─┘
│───────────────│
│               │
│ const dialect │
│   = process   │
│   .env        │
│   .DB_DIALECT │
│               │
│ if (dialect   │
│   === 'mysql')│──►┌──────────────┐
│   port = 3306 │   │ MySQL Config │
│   options = {…}   │  • port 3306 │
│               │   │  • timeout   │
│ if (dialect   │   └──────────────┘
│   === 'mssql')│──►┌──────────────┐
│   port = 1433 │   │ MSSQL Config │
│   options = {…}   │  • port 1433 │
│               │   │  • encrypt   │
└───────┬───────┘   │  • trust cert│
        │           └──────────────┘
        │
        ▼
┌───────────────────┐
│   Sequelize       │
│   Connection      │
└───────────────────┘
        │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐        ┌──────────────┐
│    MySQL     │        │  SQL Server  │
│   Database   │        │   Database   │
└──────────────┘        └──────────────┘
```

## 📝 Modelo de Datos - Diagrama Entidad-Relación

```
     ┌──────────────┐
     │   Employee   │
     │══════════════│
     │ PK id        │
     │    firstName │
     │    lastName  │
     │ UK curp      │
     │    hireDate  │
     │    dailySalary│
     │    status    │
     └──────┬───────┘
            │ 1
            │
            │ N
     ┌──────┴───────┐
     │  Assignment  │
     │══════════════│
     │ PK id        │
     │ FK employeeId│
     │ FK deptId    │
     │ FK positionId│
     │    dailySalary│
     │    startDate │
     │    endDate   │
     └──┬────────┬──┘
     N  │        │ N
        │        │
        │ 1      │ 1
┌───────┴───┐ ┌─┴──────────┐
│Department │ │  Position  │
│═══════════│ │════════════│
│ PK id     │ │ PK id      │
│    name   │ │    name    │
│ UK code   │ │    level   │
│    status │ │    salary  │
└───────────┘ │    status  │
              └────────────┘

     ┌──────────────┐
     │PayrollPeriod │
     │══════════════│
     │ PK id        │
     │    type      │
     │    startDate │
     │    endDate   │
     │    status    │
     └──────┬───────┘
            │ 1
            │
            │ N
     ┌──────┴────────┐
     │ PayrollEntry  │
     │═══════════════│
     │ PK id         │
     │ FK periodId   │
     │ FK employeeId │
     │    basePay    │
     │    bonuses    │
     │    deductions │
     │    netPay     │
     └───────────────┘

┌──────────────┐        ┌──────────────┐
│    Bonus     │        │  ChangeLog   │
│══════════════│        │══════════════│
│ PK id        │        │ PK id        │
│    name      │        │ FK employeeId│
│    amountType│        │    changeType│
│    amount    │        │    oldValue  │
│    active    │        │    newValue  │
└──────────────┘        │    changedAt │
                        └──────────────┘
```

## 🚀 Ciclo de Vida de una Request

```
┌──────────────────────────────────────────────────────┐
│                   CICLO COMPLETO                      │
└──────────────────────────────────────────────────────┘

1. ┌────────────┐
   │ NAVEGADOR  │ Usuario hace click
   └──────┬─────┘
          │ HTTP GET /empleados
          │
2.        ▼
   ┌──────────────┐
   │   EXPRESS    │ app.use('/empleados', employeeRoutes)
   │   ROUTING    │
   └──────┬───────┘
          │ router.get('/', controller.list)
          │
3.        ▼
   ┌──────────────────┐
   │   MIDDLEWARE     │
   │   • parse body   │
   │   • auth check   │
   │   • logging      │
   └──────┬───────────┘
          │
4.        ▼
   ┌───────────────────┐
   │   CONTROLLER      │
   │   list: async()   │
   │   {               │
   │     try {         │
5.        ▼             │
   ┌───────────────────┤
   │     MODEL/ORM     │
   │     findAll()     │
   └──────┬────────────┘
          │ SQL Query
6.        ▼
   ┌──────────────────┐
   │   BASE DATOS     │
   │   SELECT *...    │
   └──────┬───────────┘
          │ Results
7.        ▼
   ┌──────────────────┐
   │   CONTROLLER     │
   │   res.render()   │
   └──────┬───────────┘
          │
8.        ▼
   ┌──────────────────┐
   │   EJS ENGINE     │
   │   • Load template│
   │   • Process data │
   │   • Generate HTML│
   └──────┬───────────┘
          │ HTML
9.        ▼
   ┌──────────────────┐
   │   EXPRESS        │
   │   Response       │
   └──────┬───────────┘
          │ HTTP Response
10.       ▼
   ┌──────────────────┐
   │   NAVEGADOR      │ Muestra página
   └──────────────────┘
```

## 🔄 Patrón MVC en Acción

```
┌───────────────────────────────────────────────────┐
│                      MVC                           │
└───────────────────────────────────────────────────┘

MODEL                CONTROLLER              VIEW
═════                ══════════              ════

┌──────────┐        ┌──────────┐          ┌──────────┐
│ Employee │        │ employee │          │employees/│
│  .js     │◄───────│Controller│─────────►│ list.ejs │
│          │        │   .js    │          │          │
│ • fields │        │          │          │ <table>  │
│ • valid. │        │ • list() │          │  <% for  │
│ • hooks  │        │ • create()          │    emp   │
│ • assoc. │        │ • update()          │  %>      │
└────┬─────┘        │ • delete()          │ </table> │
     │              └────┬─────┘          └──────────┘
     │                   │
     │ Sequelize ORM     │ Business Logic
     │                   │
     ▼                   ▼
┌──────────────────────────────┐
│         DATABASE              │
│  ┌─────────────────────────┐ │
│  │      Employees          │ │
│  │ ┌────┬────────┬────────┐│ │
│  │ │ id │ name   │ salary ││ │
│  │ ├────┼────────┼────────┤│ │
│  │ │ 1  │ Juan   │ 1000   ││ │
│  │ │ 2  │ Ana    │ 1500   ││ │
│  │ └────┴────────┴────────┘│ │
│  └─────────────────────────┘ │
└──────────────────────────────┘

SEPARACIÓN DE RESPONSABILIDADES:
─────────────────────────────────
• MODEL: Qué datos existen
• VIEW: Cómo se muestran
• CONTROLLER: Qué hacer con ellos
```

## 📚 Convención de Nombres

```
┌────────────────────────────────────────────────────┐
│                CONVENCIONES                         │
└────────────────────────────────────────────────────┘

ARCHIVOS:
─────────
• Models:         employee.js (singular, camelCase)
• Controllers:    employeeController.js
• Routes:         employees.js (plural)
• Views:          employees/list.ejs (plural)

RUTAS URL:
──────────
• /empleados      (plural, español)
• /departamentos
• /payroll

TABLAS BD:
──────────
• Employees       (plural, PascalCase)
• Departments
• PayrollPeriods

FUNCIONES:
──────────
• list()          (verbo, camelCase)
• create()
• update()
• delete()

VARIABLES:
──────────
• dailySalary     (camelCase)
• firstName
• employeeId

CONSTANTES:
───────────
• MAX_SALARY      (UPPER_SNAKE_CASE)
• TAX_RATE
```

---

## 📊 Resumen Visual

```
┌────────────────────────────────────────────────────────┐
│          SISTEMA DE GESTIÓN DE NÓMINA                   │
├────────────────────────────────────────────────────────┤
│                                                          │
│  Frontend (Cliente)                                      │
│  └─► EJS Templates + Bulma CSS                          │
│                                                          │
│  Backend (Servidor)                                      │
│  └─► Node.js + Express.js 5                             │
│      └─► Patrón MVC                                     │
│          ├─► Models (Sequelize)                         │
│          ├─► Views (EJS)                                │
│          └─► Controllers (Lógica)                       │
│                                                          │
│  Base de Datos                                           │
│  └─► MySQL / SQL Server (Flexible)                      │
│      └─► 9 Tablas principales                           │
│                                                          │
│  Funcionalidades                                         │
│  ├─► Gestión de Empleados                               │
│  ├─► Departamentos y Puestos                            │
│  ├─► Cálculo de Nómina                                  │
│  ├─► Sistema de Bonos                                   │
│  └─► Bitácora de Auditoría                              │
│                                                          │
└────────────────────────────────────────────────────────┘
```

---

**Para más información, consulta:**
- [README.md](README.md) - Documentación principal
- [API.md](API.md) - Detalles técnicos
- [EJEMPLOS.md](EJEMPLOS.md) - Casos de uso

---

*Sistema de Nómina - CESUN Universidad 2026*
