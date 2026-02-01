module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    positionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dailySalary: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'Assignments',
    timestamps: true
  });

  Assignment.associate = (models) => {
    Assignment.belongsTo(models.Employee, { foreignKey: 'employeeId' });
    Assignment.belongsTo(models.Department, { foreignKey: 'departmentId' });
    Assignment.belongsTo(models.Position, { foreignKey: 'positionId' });
  };

  return Assignment;
};
