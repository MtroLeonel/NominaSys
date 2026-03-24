require('dotenv').config();

// Detectar el dialecto de base de datos (postgres o mssql)
const dialect = process.env.DB_DIALECT || 'postgres';

// Configurar puerto por defecto según el dialecto
const defaultPorts = {
  postgres: 5432,
  mssql: 1433
};
const defaultPort = defaultPorts[dialect] || 5432;

// Configurar opciones específicas del dialecto
const getDialectOptions = () => {
  if (dialect === 'mssql') {
    return {
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    };
  } else if (dialect === 'postgres') {
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
  host: process.env.DB_HOST,
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
