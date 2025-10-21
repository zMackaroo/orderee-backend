export default (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

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
    tableName: 'clients',
    timestamps: true,
    paranoid: true,
    underscored: false,
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] }
      }
    }
  });

  Client.associate = (models) => {
   //  Client.belongsTo(models.Client, {
   //    foreignKey: 'client_id',
   //    as: 'client'
   // });
   //  Client.belongsTo(models.Client, {
   //    foreignKey: 'client_id',
   //    as: 'client'
   // });
  };

  return Client;
};
