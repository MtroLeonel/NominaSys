module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    level: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    baseSalary: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  }, {
    tableName: 'Positions',
    timestamps: true
  });

  Position.associate = (models) => {
    Position.hasMany(models.Assignment, { foreignKey: 'positionId' });
  };

  return Position;
};
