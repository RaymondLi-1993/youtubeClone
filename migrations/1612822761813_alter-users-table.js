/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`ALTER TABLE users ADD UNIQUE(username)`);
};

exports.down = pgm => {
  pgm.sql(`
    ALTER TABLE users DROP UNIQUE(username),
    `);
};
