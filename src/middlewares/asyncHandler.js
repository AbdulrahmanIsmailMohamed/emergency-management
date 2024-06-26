export default (routeHandler) => {
  return async (req, res, next) => {
    try {
      await routeHandler(req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};
