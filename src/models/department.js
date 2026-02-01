module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  }, {
    tableName: 'Departments',
    timestamps: true
  });

  Department.associate = (models) => {
    Department.hasMany(models.Assignment, { foreignKey: 'departmentId' });
  };

  return Department;
};
