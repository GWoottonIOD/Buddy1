const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const Users = require("./users")

class Secure extends Model { }
//Sequelize will create this table if it doesn't exist on startup
Secure.init({
    id: {
        type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
    },

    userID: {
        type: DataTypes.INTEGER, allowNull: true, required: false,
        references: {
            model: Users, //reference to another model
            key: "id", //column name of the referenced model
            indexes: [{ unique: true }],
        }
    },
    secureCode: {
        type: DataTypes.STRING, allowNull: true, required: true
    }
},
    {
        sequelize: sequelizeInstance, modelName: 'Secure', 
        timestamps: true, 
        freezeTableName: true
    }
)
module.exports = Secure;