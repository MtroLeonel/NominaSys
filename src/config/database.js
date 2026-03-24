require('dotenv').config();

// Detectar el dialecto de base de datos (postgres o mysql)
const dialect = process.env.DB_DIALECT || 'postgres';

// Configurar puerto por defecto según el dialecto
const defaultPorts = {
  postgres: 5432,
  mysql: 3306
};
const defaultPort = defaultPorts[dialect] || 5432;
const pgSslMode = (process.env.DB_SSL_MODE || '').toLowerCase();

const getDbHost = () => {
  // Permite corregir valores donde se pegó "?sslmode=require" dentro del host.
  return (process.env.DB_HOST || '').split('?')[0];
};

// Configurar opciones específicas del dialecto
const getDialectOptions = () => {
  if (dialect === 'postgres') {
    const options = {
      connectTimeout: 10000
    };

    if (pgSslMode === 'require') {
      options.ssl = {
        require: true,
        rejectUnauthorized: false
      };
    }

    return options;
  }

  if (dialect === 'mysql') {
    return {
      connectTimeout: 10000
    };
  }

  return {};
};

// Configuración base
const baseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: getDbHost(),
  port: process.env.DB_PORT || defaultPort,
  dialect: dialect,
  dialectOptions: getDialectOptions()
};

module.exports = {
  development: {
    ...baseConfig,
    database: process.env.DB_NAME,
    logging: console.log
  },
  test: {
    ...baseConfig,
    database: process.env.DB_NAME + '_test',
    logging: false
  },
  production: {
    ...baseConfig,
    database: process.env.DB_NAME,
    logging: false
  }
};
