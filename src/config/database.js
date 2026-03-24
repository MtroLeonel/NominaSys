require('dotenv').config();

// PostgreSQL configuration
const pgSslMode = (process.env.DB_SSL_MODE || '').toLowerCase();

const getDbHost = () => {
  // Permite corregir valores donde se pegó "?sslmode=require" dentro del host.
  return (process.env.DB_HOST || '').split('?')[0];
};

// Configurar opciones de PostgreSQL
const getDialectOptions = () => {
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
};

// Configuración base
const baseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: getDbHost(),
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
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
