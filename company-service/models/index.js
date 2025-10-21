import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: "postgres",
    host: process.env.DB_HOST,
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

export default class DBSetup {
    constructor() {
        this.sequelize = sequelize;
    }

    async connect() {
        try {
            return await this.sequelize.authenticate();
        } catch (error) {
            throw error;
        }
    }
    
}