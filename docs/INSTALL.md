# 🚀 Guía de Instalación Rápida - Sistema de Nómina

Esta guía te ayudará a poner en marcha el sistema en menos de 5 minutos.

## ✅ Requisitos

- Node.js instalado
- PostgreSQL o MySQL instalado y corriendo

## 📦 Instalación en 5 Pasos

### Paso 1: Instalar dependencias
```bash
npm install
```

### Paso 2: Crear base de datos

**PostgreSQL:**
```sql
CREATE DATABASE practicanomina;
```

**MySQL:**
```sql
CREATE DATABASE practicanomina;
```

### Paso 3: Configurar variables de entorno

Copia el archivo de ejemplo y edítalo:
```bash
copy .env.example .env
```

Edita el archivo `.env` con tus credenciales:

**Para PostgreSQL:**
```env
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=practicanomina
```

**Para MySQL:**
```env
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=practicanomina
```

### Paso 4: Inicializar base de datos
```bash
npm run seed
```

Este comando creará todas las tablas y datos de prueba.

### Paso 5: Iniciar la aplicación
```bash
npm run dev
```

¡Listo! Abre tu navegador en: **http://localhost:3000**

## 📊 Datos de Prueba

Después del seed, tendrás:
- 2 empleados (Juan Pérez, María López)
- 2 departamentos (TI, Ventas)
- 2 puestos (Senior Dev, Ejecutiva)
- 1 periodo de nómina quincenal
- Bonos configurados

## 🎯 Primeros Pasos

1. **Ver empleados**: Click en "Empleados" en el menú
2. **Crear empleado**: Click en "Nuevo Empleado"
3. **Ver nómina**: Click en "Nómina" para ver el cálculo

## 🐛 Problemas Comunes

### "Cannot connect to database"
- Verifica que tu base de datos esté corriendo
- Revisa las credenciales en `.env`
- Confirma que el puerto es correcto

### "Port 3000 already in use"
- Cambia el puerto en `.env`: `PORT=3001`

### "Module not found"
- Ejecuta: `npm install`

## 📚 Documentación Completa

Para mas detalles, consulta el archivo [README.md](../README.md)

---

¿Necesitas ayuda? Revisa la sección de Solución de Problemas en el README.
