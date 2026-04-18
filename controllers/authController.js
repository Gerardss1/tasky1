const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: 'Usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword
    });

    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user.id)
    });

  } catch (error) {
    res.status(500).json({ msg: 'Error en registro' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuario no existe' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user.id)
    });

  } catch (error) {
    res.status(500).json({ msg: 'Error en login' });
  }
};