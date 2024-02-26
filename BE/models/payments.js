const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const Users = require("./users")
const Debts = require("./debts")

class Payments extends Model { }
//Sequelize will create this table if it doesn't exist on startup
Payments.init({
    id: {
        type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
    },
    userID: {
        type: DataTypes.INTEGER, allowNull: true, required: true,
        references: {
            model: Users, //reference to another model
            key: "id", //column name of the referenced model
            indexes: [{ unique: true }],
        }
    },
    debtID: {
        type: DataTypes.INTEGER, allowNull: true, required: true,
        references: {
            model: Debts, //reference to another model
            key: "id", //column name of the referenced model
            indexes: [{ unique: true }],
        }
    },
    amount: {
        type: DataTypes.INTEGER, allowNull: false, required: true
    },
},
    {
        sequelize: sequelizeInstance, modelName: 'Payments', timestamps: true, freezeTableName: true
    }
)
module.exports = Payments;


