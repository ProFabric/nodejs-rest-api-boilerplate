const AuthController = {};

AuthController.login = (req, res) => {
  res.status(200).json(req.user.toAuthJSON());
};

export default AuthController;
