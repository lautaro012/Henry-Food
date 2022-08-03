const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    health_score: {
      type: DataTypes.INTEGER,
    },
    step_by_step: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    extendedIngredients: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    image: {
      type: DataTypes.TEXT,
    },
    cheap: {
      type: DataTypes.STRING
    },
    veryPopular: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,  
  });
};
