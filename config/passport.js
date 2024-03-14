import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
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
          // Find user by email
          const user = await User.findOne({ email });

          // If user not found, return error message
          if (!user) {
            return done(
              null,
              false,
              req.flash("error_msg", "That email is not registered")
            );
          }

          // Compare passwords
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            // If passwords match, return user
            return done(null, user);
          } else {
            // If passwords don't match, return error message
            return done(
              null,
              false,
              req.flash("error_msg", "Password incorrect")
            );
          }
        } catch (error) {
          // Handle any unexpected errors
          console.error(error);
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
