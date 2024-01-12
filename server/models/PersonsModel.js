import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Persons = db.define('persons', {
    
    last_name_bride: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bride_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name_groom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    groom_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wedding_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default Persons;