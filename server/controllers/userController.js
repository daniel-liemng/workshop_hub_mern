const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @route   POST api/users
// @desc    Register user
// @access  Public
const registerUser = async (req, res) => {
  // 1. See if user exists
  // 2. Get user gravatar
  // 3. Encrypt password
  // 4. Return jwt

  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const createdUser = await newUser.save();

    res
      .status(201)
      .json({ token: generateToken(createdUser._id), userId: createdUser._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { registerUser };
