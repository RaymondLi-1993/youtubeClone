/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
       CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        comments VARCHAR(240) NOT NULL,
        user_id INTEGER REFERENCES users(id) NOT NULL
       ); 
    `);
};

exports.down = pgm => {
  pgm.sql(`
       DROP TABLE comments; 
    `);
};
