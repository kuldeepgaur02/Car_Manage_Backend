const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
  async register(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log("email and passwor",email,password)
      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid login credentials');
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = authController;