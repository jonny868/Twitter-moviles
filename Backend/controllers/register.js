const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const moment = require("moment");

//REGISTER CONTROLLER

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const id = uuidv4();

  //verificar si el nombre de usuario esta en uso
  const checkUsername = await User.findOne({ username });
  //verificar si el correo esta en uso
  const checkEmail = await User.findOne({ email });
//si el usuario esta en uso
  if (checkUsername) {
    return res.status(400).json({
      ok: false,
      message: "Username already taken",
    });
  }
//si el email esta en uso
  if (checkEmail) {
    return res.status(400).json({
      ok: false,
      message: "Email already taken",
    });
  }

  //encrypt password
  const salt = bcrypt.genSaltSync();
  const cryptPass = bcrypt.hashSync(password, salt);
  //formatear fecha de creacion
  const formatedDate = moment().format('LLL')
  console.log(formatedDate)
  const newUser = new User({ username, password: cryptPass, email, id, date:formatedDate });
  await newUser.save();
  console.log(newUser)
  res.status(200).json({
    ok: true,
    message: "User registered successfully",
  });
};

module.exports = register;
