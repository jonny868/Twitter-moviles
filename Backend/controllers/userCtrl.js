const bcrypt = require("bcrypt");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const Tweet = require("../models/Tweet");

const login = async (req, res) => {
  // console.log('Hello?')
  const { username, password } = req.body;
  const findUsername = await User.findOne({ username });
  if (findUsername) {
    const verifyPassword = bcrypt.compareSync(password, findUsername.password);
    if (verifyPassword) {
      const {
        username,
        id,
        date,
        email,
        profilePicture,
        bio,
        dob,
        name,
        location,
      } = findUsername;
      // console.log(findUsername);
      return res.status(200).json({
        username,
        id,
        date,
        email,
        profilePicture,
        bio,
        name,
        location,
        dob,
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
      message: "username incorrect",
    });
  }
};

//REGISTER CONTROLLER

const register = async (req, res) => {
  const { username, name, password, email, bio, dob, location } = req.body;
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
  const formatedDate = moment().format("LLL");
  const newUser = new User({
    username,
    password: cryptPass,
    email,
    bio,
    id,
    name,
    location,
    dob,
    date: formatedDate,
  });
  await newUser.save();
  // console.log(newUser);
  res.status(200).json({
    ok: true,
    message: "User registered successfully",
  });
};

const find = async (req, res) => {
  const { text } = req.params;
  const findUser = await User.find({ username: { $regex: text } });
  const findTweets = await Tweet.find({ content: { $regex: text } });
  if (findUser || findTweets) {
    return res.status(200).json({ profiles: findUser, tweets: findTweets });
  } else {
    return res.status(404).json({
      message: "No results found",
    });
  }
};

const setFavorite = async (req, res)=>{
  const {user, data} = req.body
  const findFavorite = await User.findOne({'id':user,'favorites':data})
  // console.log(findFavorite)
  console.log(user,data)
  // SI NO ESTA EL TWEET EN LOS FAVORITOS
  if(findFavorite === null){
    // console.log('jejeps')
    await User.updateOne({'id':user}, {'$push':{'favorites':data}})
    return res.json({
      message:'Tweet Added to favorites'
    })
  }else{
    // SI ESTA EL TWEET LO SACA
    await User.findOneAndUpdate({'id':user}, {'$pull':{'favorites':data}})
    return res.json(
      {
        message:'Tweet Removed from favorites'
      }
    )
  }
}

const followUser = async (req, res) => {
const {user, data} = req.body
const findFollower = await User.findOne({'id': user, 'followers':data})
if(findFollower === null){
  await User.updateOne({'id': user},{'$inc': { "followCount": 1 },  "$push":{'followers': data}})
  return res.json({
    message:'You are now following this user',
    following: true
  })
}else{
  await User.findOneAndUpdate({'id': user},{'$inc': { "followCount": -1 },  "$pull":{'followers': data}})
  return res.json({message:'No longer following this user',
following: false})
}
}

const retrieveFavorites = async (req, res)=>{
  const favorites = [];
  // console.log(req.params)
  const findFavorites = await User.find({'id':req.params.userId}, 'favorites')
    // console.log(findFavorites[0].favorites.length)
  for (let i = 0; i < findFavorites[0].favorites.length; i++) {
    const fav = await Tweet.find({'id':findFavorites[0].favorites[i]});
    if (fav) {
      // console.log(fav)
     favorites.push(...fav)
    }
    else{
      continue
    }
  }
  console.log('FAVORITES:',favorites)
  return res.send(favorites)
  }

module.exports = { login, find, register, setFavorite,followUser, retrieveFavorites };
