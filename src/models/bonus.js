module.exports = (sequelize, DataTypes) => {
  const Bonus = sequelize.define('Bonus', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    amountType: {
      type: DataTypes.ENUM('fixed', 'percent'),
      allowNull: false,
      defaultValue: 'fixed'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'Bonuses',
    timestamps: true
  });

  Bonus.associate = () => {
    // Placeholder for future associations
  };

  return Bonus;
};
