# 📝 Registro de Cambios (Changelog)

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere al [Versionado Semántico](https://semver.org/lang/es/).

## [No Publicado]

### Por Hacer
- Módulo de deducciones fiscales (ISR, IMSS)
- Exportación de nómina a PDF
- Sistema de autenticación y autorización
- API REST
- Tests unitarios y de integración

## [1.0.0] - 2026-02-16

### 🎉 Lanzamiento Inicial

Primera versión funcional del Sistema de Gestión de Nómina.

### ✨ Agregado
- **Gestión de Empleados**
  - Crear, listar y visualizar empleados
  - Validación de CURP único
  - Estado activo/inactivo
  
- **Gestión de Departamentos**
  - CRUD completo de departamentos
  - Códigos únicos por departamento
  
- **Gestión de Puestos**
  - Administración de puestos de trabajo
  - Niveles jerárquicos (Jr, Mid, Sr)
  - Salario base por puesto
  
- **Sistema de Asignaciones**
  - Relación empleado-departamento-puesto
  - Registro de fechas de inicio/fin
  - Salario específico por asignación
  
- **Cálculo de Nómina**
  - Periodos: semanal, quincenal, mensual
  - Cálculo automático de salarios
  - Estados: abierto, cerrado, pagado
  - Generación automática de entradas
  
- **Sistema de Bonos**
  - Bonos en porcentaje o monto fijo
  - Activación/desactivación de bonos
  - Aplicación automática en nómina
  
- **Bitácora de Cambios**
  - Registro automático de modificaciones
  - Tracking de cambios en empleados
  - Auditoría completa del sistema
  
- **Interfaz de Usuario**
  - Diseño moderno con Bulma CSS
  - Vistas responsive
  - Navegación intuitiva
  - Formularios validados
  
- **Base de Datos Multi-Motor**
  - Soporte para MySQL
  - Soporte para SQL Server
  - Configuración mediante variables de entorno
  - Conexión automática según dialecto
  
- **Arquitectura**
  - Patrón MVC
  - Sequelize ORM
  - Express.js 5
  - EJS templates
  - Layouts reutilizables

### 📚 Documentación
- README.md completo con guía de uso
- INSTALL.md con guía rápida
- API.md con documentación técnica
- CONTRIBUTING.md con guía de contribución
- CHANGELOG.md para registro de versiones
- Archivo .env.example con configuración de ejemplo

### 🔧 Configuración
- Variables de entorno para configuración
- Script de seed para datos de prueba
- Soporte para desarrollo y producción
- Configuración de base de datos flexible

### 🛠️ Utilidades
- Script de inicialización (seed.js)
- Nodemon para desarrollo
- Datos de prueba incluidos
- Estructura de proyecto organizada

---

## Tipos de Cambios

- `Agregado` - Para funcionalidades nuevas
- `Cambiado` - Para cambios en funcionalidades existentes
- `Obsoleto` - Para funcionalidades que se eliminarán pronto
- `Eliminado` - Para funcionalidades eliminadas
- `Corregido` - Para corrección de bugs
- `Seguridad` - Para vulnerabilidades de seguridad

---

## Versionado

Este proyecto usa Versionado Semántico (SemVer):

- **MAJOR** (X.0.0) - Cambios incompatibles con versiones anteriores
- **MINOR** (0.X.0) - Nuevas funcionalidades compatibles
- **PATCH** (0.0.X) - Corrección de bugs compatible

---

## Roadmap (Próximas Versiones)

### v1.1.0 - Mejoras de Funcionalidad
- Editar empleados existentes
- Eliminar registros (soft delete)
- Búsqueda y filtros avanzados
- Paginación de resultados

### v1.2.0 - Reportes y Exportación
- Exportar nómina a Excel
- Exportar nómina a PDF
- Reportes de costos por departamento
- Gráficas de estadísticas

### v1.3.0 - Deducciones
- Cálculo de ISR
- Cálculo de IMSS
- Deducciones personalizadas
- Resumen fiscal

### v2.0.0 - Sistema Empresarial
- Autenticación de usuarios
- Roles y permisos
- Multi-empresa
- API REST completa
- Dashboard con KPIs

### v2.1.0 - Módulos Adicionales
- Gestión de vacaciones
- Control de asistencias
- Cálculo de aguinaldo
- PTU automático

### v3.0.0 - Funcionalidades Avanzadas
- Integración con bancos
- Timbrado de nómina (CFDI)
- App móvil
- Notificaciones automáticas
- Firma electrónica

---

## Contribuir

Para contribuir al proyecto, consulta [CONTRIBUTING.md](CONTRIBUTING.md)

## Licencia

ISC - Ver archivo LICENSE para más detalles
