# Sistema de Gestion de Nomina

Aplicacion web para gestion de empleados, departamentos, puestos, bonos y calculo de nomina.

## Stack

- Node.js + Express.js
- Sequelize ORM
- EJS + Bulma CSS
- PostgreSQL o MySQL

## Inicio Rapido

1. Instala dependencias:

```bash
npm install
```

2. Copia variables de entorno:

```bash
copy .env.example .env
```

3. Configura tu base de datos en .env:

```env
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contrasena
DB_NAME=practicanomina
```

Para MySQL:

```env
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contrasena
DB_NAME=practicanomina
```

4. Inicializa datos de prueba:

```bash
npm run seed
```

5. Ejecuta en desarrollo:

```bash
npm run dev
```

Aplicacion disponible en http://localhost:3000

## Scripts

- npm run dev: Inicia servidor con nodemon.
- npm start: Inicia servidor en modo normal.
- npm run seed: Crea tablas y datos de prueba.

## Documentacion Tecnica

- docs/INSTALL.md: instalacion detallada y troubleshooting.
- docs/API.md: endpoints y respuestas JSON.
- docs/ARCHITECTURE.md: arquitectura y flujos del sistema.
- docs/EJEMPLOS.md: casos de uso paso a paso.
- docs/DOCS.md: indice general de documentacion.

## Contribucion y cambios

- CONTRIBUTING.md
- CHANGELOG.md
