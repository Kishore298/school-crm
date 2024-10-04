const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role,
        token: generateToken(user._id), 
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error in loginUser:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {  loginUser };



