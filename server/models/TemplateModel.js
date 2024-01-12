import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Template = db.define('template', {
    
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    video: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default Template;