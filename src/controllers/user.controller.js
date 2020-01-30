const userModel = require('../models/user.model');

const userController = {};

userController.registerUser = (req, res) => {
  const userData = req.body;
  return userModel
    .findOne({ email: userData.email })
    .then(data => {
      if (data) {
        return res.status(500).json({ message: 'Kullanıcı zaten var' });
      }
      // eslint-disable-next-line promise/no-return-wrap
      return Promise.resolve(data);
    })
    .then(() => userModel.create({ email: userData.email, password: userData.password }))
    .then(() => res.status(200).json({ message: 'Kullanıcı oluşturuldu' }))
    .catch(error => res.status(500).json(error));
};

module.exports = userController;
