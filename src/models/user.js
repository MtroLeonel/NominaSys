module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'rrhh', 'supervisor'),
      defaultValue: 'rrhh'
    },
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'Users',
    timestamps: true
  });

  User.associate = (models) => {
    User.hasMany(models.ChangeLog, { foreignKey: 'changedBy' });
  };

  return User;
};
