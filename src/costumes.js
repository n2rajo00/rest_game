require('dotenv').config();
const mysql = require('mysql2/promise');

const conf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

connect();

async function connect(){
    try {
        const connection = await mysql.createConnection(conf);
        console.log("Yhteys onnistui");
    } catch (error) {
        console.log("Yhteys epäonnistui");
        console.log(error.message);
    }
}