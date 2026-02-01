# Práctica Nómina

Sistema de gestión de nómina desarrollado con Express.js, Sequelize ORM y SQL Server.

## Tecnologías

- **Express.js** - Framework web
- **Sequelize** - ORM para SQL Server
- **EJS** - Motor de plantillas
- **Bulma CSS** - Framework CSS
- **SQL Server** - Base de datos
- **Nodemon** - Desarrollo automático

## Estructura del Proyecto

```
practicanomina/
├── src/
│   ├── config/          # Configuración de la base de datos
│   ├── controllers/     # Controladores MVC
│   ├── models/          # Modelos de Sequelize
│   ├── routes/          # Rutas de la aplicación
│   ├── views/           # Vistas EJS
│   │   ├── layouts/     # Plantillas principales
│   │   └── partials/    # Componentes reutilizables
│   ├── public/          # Archivos estáticos
│   │   ├── css/         # Estilos personalizados
│   │   └── js/          # Scripts del cliente
│   └── app.js           # Punto de entrada
├── .env                 # Variables de entorno
├── .sequelizerc         # Configuración de Sequelize CLI
└── package.json         # Dependencias
```

## Configuración

1. Crea una base de datos en SQL Server llamada `practicanomina`

2. Configura las variables de entorno en `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_USER=sa
DB_PASSWORD=tu_contraseña
DB_NAME=practicanomina
DB_PORT=1433
```

## Instalación

Las dependencias ya están instaladas. Si necesitas reinstalarlas:

```bash
npm install
```

## Ejecución

Modo desarrollo con nodemon:
```bash
npm run dev
```

Modo producción:
```bash
npm start
```

## Scripts Disponibles

- `npm start` - Inicia el servidor
- `npm run dev` - Inicia con nodemon (auto-reload)

## Arquitectura MVC

- **Models (Modelos)**: Definen la estructura de datos en `src/models/`
- **Views (Vistas)**: Plantillas EJS en `src/views/`
- **Controllers (Controladores)**: Lógica de negocio en `src/controllers/`
