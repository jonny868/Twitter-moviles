const bcrypt = require("bcrypt");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const Tweet = require("../models/Tweet");

const login = async (req, res) => {
  const { username, password } = req.body;
  const findUsername = await User.findOne({ username });
  if (findUsername) {
    const verifyPassword = bcrypt.compareSync(password, findUsername.password);
    if (verifyPassword) {
      const { username, password, id, date, email, profilePicture } = findUsername;
      console.log('test')
      return res.status(200).json({
        username,
        id,
        date,
        email,
        profilePicture
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
  const newUser = new User({ username, password: cryptPass, email, id, date:formatedDate });
  await newUser.save();
  console.log(newUser)
  res.status(200).json({
    ok: true,
    message: "User registered successfully",
  });
};

const find = async (req, res) => {
  const {text} = req.params
  const findUser = await User.find({username:{ $regex: text }})
  const findTweets = await Tweet.find({content: {$regex: text}})
  if(findUser || findTweets){
    return res.status(200).json({profiles:findUser,tweets:findTweets})
  }else{
    return res.status(404).json({
      message: 'No results found',
    })
  }
}

module.exports = {login, find, register};
