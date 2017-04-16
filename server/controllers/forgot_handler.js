exports.forgotPassword = function(req, res, next) {
  const { email } = req.body;
  return res.status(200);
};