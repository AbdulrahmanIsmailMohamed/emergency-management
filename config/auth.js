export const ensureAuthenticated = (req, res, nxt) => {
  if (req.isAuthenticated()) return nxt();
  req.flash("error_msg", "Please log in to view that resource");
  res.redirect("/user/login");
};

export const forwardAuthenticated = (req, res, nxt) => {
  if (!req.isAuthenticated()) return nxt();
  res.redirect("/user/profile");
};
