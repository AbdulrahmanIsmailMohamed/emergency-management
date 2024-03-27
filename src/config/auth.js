export const ensureAuthenticated = (req, res, nxt) => {
  if (req.isAuthenticated()) return nxt();
  req.flash("error_msg", "Please log in to view that resource");
  res.redirect("/auth/login");
};

export const forwardAuthenticated = (req, res, nxt) => {
  if (!req.isAuthenticated()) return nxt();
  res.redirect("/users/profile");
};
