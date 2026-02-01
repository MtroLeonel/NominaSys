module.exports = (sequelize, DataTypes) => {
  const PayrollPeriod = sequelize.define('PayrollPeriod', {
    type: {
      type: DataTypes.ENUM('semanal', 'quincenal', 'mensual'),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('abierto', 'cerrado'),
      defaultValue: 'abierto'
    }
  }, {
    tableName: 'PayrollPeriods',
    timestamps: true
  });

  PayrollPeriod.associate = (models) => {
    PayrollPeriod.hasMany(models.PayrollEntry, { foreignKey: 'payrollPeriodId' });
  };

  return PayrollPeriod;
};
