//require('dotenv').config();
import dotEnv from 'dotenv';
dotEnv.config();
export default {
    app: {
        port: process.env.PORT || 5000
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'ejemplo'
    }
}