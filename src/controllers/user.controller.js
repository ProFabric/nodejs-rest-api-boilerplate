import UserModel from '../models/user.model';

const UserController = {};

UserController.registerUser = async (req, res) => {
  const userData = req.body;
  try {
    const user = await UserModel.findOne({ email: userData.email });
    if (user) {
      return res.status(500).json({ message: 'Kullanıcı zaten var' });
    }

    const createdUser = await UserModel.create({ email: userData.email, password: userData.password });
    return res.status(200).json({ message: 'Kullanıcı oluşturuldu', user: createdUser });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default UserController;
