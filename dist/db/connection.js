"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// HARD CODE your real values here for quick testing
const pool = new pg_1.Pool({
    user: 'postgres',
    password: 'Unicorn*19',
    host: 'localhost',
    database: 'employees_db', // or whatever your db name is
    port: 5432,
});
exports.default = pool;
