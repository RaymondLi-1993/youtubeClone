const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./db.config");
const bcrypt = require("bcrypt");

const initialize = passport => {
  const authenticate = (username, password, done) => {
    pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username],
      (err, res) => {
        if (err) {
          throw err;
        }
        if (res.rows.length > 0) {
          const user = res.rows[0];
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: `Incorrect Password` });
            }
          });
        } else {
          return done(null, false, { message: `no registered user found` });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      authenticate
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, res) => {
      if (err) {
        throw err;
      }
      console.log(res.rows[0]);
      return done(null, res.rows[0]);
    });
  });
};

module.exports = initialize;
