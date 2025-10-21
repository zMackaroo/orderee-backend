export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'client_id'
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updatedAt'
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deletedAt'
    }
  }, {
    tableName: 'menus',
    timestamps: true,
    paranoid: true,
    underscored: false
  });

  Menu.associate = (models) => {
   //  Menu.belongsTo(models.Client, {
   //    foreignKey: 'client_id',
   //    as: 'client'
   // });
   //  Menu.belongsTo(models.Category, {
   //    foreignKey: 'category_id',
   //    as: 'category'
   // });
  };

  return Menu;
};
