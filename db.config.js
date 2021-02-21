const keys = require(`./config/keys`);

const { Pool } = require("pg");

const devConfig = `postgres://${keys.DB_USER}:${keys.DB_PASSWORD}@${keys.DB_HOST}:${keys.DB_PORT}/${keys.DB_DATABASE}`;
const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString:
    process.env.NODE.ENV === `production` ? proConfig : devConfig,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = { pool };
