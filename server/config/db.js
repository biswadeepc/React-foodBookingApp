const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    min: process.env.PG_MINCONN,
    max: process.env.PG_MAXCONN,
    createTimeoutMillis: process.env.PG_createTimeoutMillis,
    acquireTimeoutMillis: process.env.PG_acquireTimeoutMillis,
    idleTimeoutMillis: process.env.PG_idleTimeoutMillis,
    reapIntervalMillis: process.env.PG_reapIntervalMillis,
});

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

pool.query('SELECT $1::int AS number', ['2'], function (err, res) {
    if (err) {
        return console.error('error running query', err);
    }
    console.log('number:', res.rows[0].number);
});

module.exports = pool;