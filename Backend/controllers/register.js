const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const moment = require("moment");

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const id = uuidv4();

  //verificar si el nombre de usuario esta en uso
  const checkUsername = await User.findOne({ username });
  const checkEmail = await User.findOne({ email });
  console.log(checkEmail);
  console.log(checkUsername);

  if (checkUsername) {
    return res.status(400).json({
      ok: false,
      message: "Username already taken",
    });
  }

  if (checkEmail) {
    return res.status(400).json({
      ok: false,
      message: "Email already taken",
    });
  }
  const salt = bcrypt.genSaltSync();
  const cryptPass = bcrypt.hashSync(password, salt);
  const formatedDate = moment().format('YYYY-MM-DD')
  const newUser = new User({ username, password: cryptPass, email, id, date: formatedDate });
  await newUser.save();
  res.status(200).json({
    ok: true,
    message: "User registered successfully",
  });
};

module.exports = register;
