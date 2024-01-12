import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Payments = db.define('payments', {
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sum_product: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nip: {
        type: DataTypes.STRING(10),
        defaultValue: null
    },
    date_buy: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    id_basket_products: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    payment_type: {
        type: DataTypes.STRING,
        defaultValue: null
    }
}, {
    freezeTableName: true
});

Payments.belongsTo(Users, { foreignKey: 'id_user' });

export default Payments;
