module.exports = (sequelize, DataTypes) => {
  const ChangeLog = sequelize.define('ChangeLog', {
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    changedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    changeType: {
      type: DataTypes.ENUM('departamento', 'puesto', 'salario'),
      allowNull: false
    },
    previousValue: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    newValue: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'ChangeLogs',
    timestamps: true
  });

  ChangeLog.associate = (models) => {
    ChangeLog.belongsTo(models.Employee, { foreignKey: 'employeeId' });
    ChangeLog.belongsTo(models.User, { foreignKey: 'changedBy' });
  };

  return ChangeLog;
};
