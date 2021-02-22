const express = require(`express`);
const router = express.Router();
const passport = require(`passport`);
const { pool } = require(`../../db.config`);
const bcrypt = require(`bcrypt`);
const saltRounds = 10;

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.send({ err: 1 });
  }
};

router.post(
  `/api/auth`,
  passport.authenticate(`local`, {
    failureFlash: true,
    successRedirect: `/api/success`,
    failureRedirect: `/api/failure`,
  })
);

router.get(`/api/success`, (req, res) => {
  console.log(req.user);
  const { username, id } = req.user;
  res.send({ id, username });
});

router.get(`/api/login`, checkAuthenticated, (req, res) => {
  const { username, id } = req.user;
  res.send({ username, id });
});

router.get(`/api/failure`, (req, res) => {
  const errors = req.flash("error") || [];
  res.send({ errors });
});

router.post(`/api/create`, async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await pool.query(`INSERT INTO users(username, password) VALUES($1, $2)`, [
      username,
      hashedPassword,
    ]);
    res.send({ err: 0 });
  } catch (err) {
    res.send({ err, message: `Username Taken` });
  }
});

router.post(`/api/demo`, async (req, res) => {
  try {
    const { username } = req.body;
    const response = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    let { id } = response.rows[0];

    res.send({ id, username });
  } catch (err) {
    console.log(err);
  }
});

router.get(`/api/logout`, (req, res) => {
  try {
    req.session.destroy(() => {
      res.send({ redirect: `/` });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post(`/api/addcomment`, async (req, res) => {
  try {
    const { post, userId } = req.body;
    await pool.query(`INSERT INTO comments(comments, user_id) VALUES($1, $2)`, [
      post,
      userId,
    ]);
    res.send(`message created`);
  } catch (err) {
    console.log(err);
  }
});

router.get(`/api/fetchComments`, async (req, res) => {
  const response = await pool.query(
    `SELECT username, comments, comments.id FROM comments JOIN users ON users.id = comments.user_id ORDER BY comments.id DESC`
  );
  res.send({ comments: response.rows });
});

router.post(`/api/delete`, async (req, res) => {
  try {
    const { intId, userId } = req.body;
    const checkUser = await pool.query(
      `SELECT username FROM users WHERE users.id = $1`,
      [userId]
    );
    if (checkUser.rows[0]) {
      await pool.query(`DELETE FROM comments WHERE id = $1`, [intId]);
      res.send({ err: 0 });
    } else {
      res.send({ err: 1 });
    }
  } catch (err) {
    console.log(err);
  }
});

// router.get(`/api/login`, async (req, res) => {
// try {
//   const { rows } = await pool.query(`SELECT * FROM users`);
//   const { username, id } = rows[0];
//   res.send({ username, id });
// } catch (err) {
//   console.log(err);
// }
// });

// router.post(`/api/newuser`, async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.put(`/users/:id`, async (req, res) => {});

// router.delete(`/users/:id`, async (req, res) => {});

module.exports = router;
