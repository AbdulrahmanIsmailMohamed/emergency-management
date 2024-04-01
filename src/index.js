import express, { urlencoded, json } from "express";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import MongoDBStore from "connect-mongodb-session";
import { config } from "dotenv";

import { db } from "./db/connect.js";
import { errorHandling } from "./middlewares/errorHandlingMW.js";
import routes from "./routes/index.js";

const app = express();

config(); // Load environment variables
db(); // Connect to the database

// Passport configuration
import { passportInit } from "./config/passport.js";
passportInit();

// Middleware
app.use(urlencoded({ extended: false }));
app.use(json());

// Configure express-session
const MongoDBStoreInstance = MongoDBStore(session);
const store = new MongoDBStoreInstance({
  uri: process.env.MONGO_URL,
  collection: "mySessions",
});

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // Maximum age of the session cookie 
    },
  })
);

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash for flash messages
app.use(flash());

// Global variables accessible in views
app.use((req, res, nxt) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.invalid = req.flash("invalid");
  res.locals.user = req.user;
  nxt();
});

// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));
app.use(express.static("node_modules"));

app.get("/", (req, res) => {
  res.redirect("/emergencies/basemap");
});

// Routes
app.use(`/`, routes);

app.all("*", (req, res, next) => {
  return res.render("error/notFound")
});

// Glopal Error Handling Middleware In Express
app.use(errorHandling);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
