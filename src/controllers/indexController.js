const db = require('../models');

const indexController = {
  index: async (req, res) => {
    try {
      res.render('index', {
        title: 'Inicio',
        message: 'Bienvenido a Práctica Nómina'
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error en el servidor');
    }
  }
};

module.exports = indexController;
