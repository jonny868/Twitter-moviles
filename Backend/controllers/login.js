const bcrypt = require("bcrypt");
const User = require("../models/User");

const login = async (req, res) => {
  const { username, password } = req.body;
  const findUsername = await User.findOne({ username });
  if (findUsername) {
    const verifyPassword = bcrypt.compareSync(password, findUsername.password);
    if (verifyPassword) {
      const { username, password, id, date, email } = findUsername;
      console.log('test')
      return res.status(200).json({
        ok: true,
        username,
        password,
        id,
        date,
        email,
      });
    } else {
      return res.status(404).json({
        ok: false,
        message: "password incorrect",
      });
    }
  } else {
    return res.status(404).json({
        ok: false,
        message: "username incorrect"
    });
  }
};

module.exports = login;
