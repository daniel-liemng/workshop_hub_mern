const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const payload = {
    user: { id },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = generateToken;
