import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Template from "./TemplateModel.js";
import Persons from "./PersonsModel.js";
import Payments from "./PaymentsModel.js";

const {DataTypes} = Sequelize;

const Products = db.define('product',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    id_persons: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        validate:{
            notEmpty: true
        }
    },
    id_template: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        validate:{
            notEmpty: false
        }
    },
    kod_qr: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    pin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    qr_personal_page: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    book_activity: {
        type: DataTypes.ENUM('1', '2', '3'),
        allowNull: true,
        validate: {
          isIn: [['1', '2', '3']]
        }
      },
    date_of_purchase: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    freezeTableName: true
});

Users.hasMany(Products);
Products.belongsTo(Users, {foreignKey: 'userId'});
Products.belongsTo(Template, { foreignKey: 'id_template' });
Products.belongsTo(Persons, { foreignKey: 'id_persons' });

export default Products;