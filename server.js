const keys = require("./config/keys");

const express = require(`express`);
const passport = require(`passport`);
const session = require(`express-session`);
const postGresqlStore = require("connect-pg-simple")(session);
const usersRouter = require(`./src/routes/users`);
const flash = require(`connect-flash`);

const initializePassport = require("./passportConfig");
initializePassport(passport);

const isProduction = process.env.NODE_ENV === `production`;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new postGresqlStore({
      conString: isProduction
        ? keys.dataBaseUrl
        : `postgres://${keys.DB_USER}:${keys.DB_PASSWORD}@${keys.DB_HOST}:${keys.DB_PORT}/${keys.DB_DATABASE}`,
    }),
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(usersRouter);

const path = require("path");
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static("client/build"));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Alright you got it! running on ${PORT}`);
});
