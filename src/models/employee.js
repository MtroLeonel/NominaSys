module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    firstName: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    curp: {
      type: DataTypes.STRING(18),
      allowNull: false,
      unique: true
    },
    hireDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dailySalary: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  }, {
    tableName: 'Employees',
    timestamps: true,
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }
  });

  Employee.associate = (models) => {
    Employee.hasMany(models.Assignment, { foreignKey: 'employeeId' });
    Employee.hasMany(models.ChangeLog, { foreignKey: 'employeeId' });
    Employee.hasMany(models.PayrollEntry, { foreignKey: 'employeeId' });
  };

  return Employee;
};
