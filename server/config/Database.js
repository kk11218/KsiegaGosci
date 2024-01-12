import { Sequelize } from "sequelize";

const db = new Sequelize('guestbook', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;