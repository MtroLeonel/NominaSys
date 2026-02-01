module.exports = (sequelize, DataTypes) => {
  const PayrollEntry = sequelize.define('PayrollEntry', {
    payrollPeriodId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    daysWorked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    absences: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    sickLeaveDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    vacationDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    grossSalary: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    imss: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    isr: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    bonuses: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    netPay: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'PayrollEntries',
    timestamps: true
  });

  PayrollEntry.associate = (models) => {
    PayrollEntry.belongsTo(models.PayrollPeriod, { foreignKey: 'payrollPeriodId' });
    PayrollEntry.belongsTo(models.Employee, { foreignKey: 'employeeId' });
  };

  return PayrollEntry;
};
