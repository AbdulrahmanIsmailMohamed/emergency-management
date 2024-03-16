import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import passport from "passport";

export const passportInit = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(
              null,
              false,
              req.flash("error_msg", "That email is not registered")
            );
          }

          if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(
              null,
              false,
              req.flash("error_msg", "Password incorrect")
            );
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
