require("dotenv").config();
const keys = require(`./config/keys`);

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === `production`;

const connectionString = `postgres://${keys.DB_USER}:${keys.DB_PASSWORD}@${keys.DB_HOST}:${keys.DB_PORT}/${keys.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? keys.DATABASE_URL : connectionString,
  ssl: { rejectUnauthorized: false },
});

module.exports = { pool };
