const { Router } = require("express");
const {login, find, register} = require('./controllers/userCtrl');
const  {addNewTweet, findTweetsByUserId}  = require("./controllers/tweet");

const router = Router();

router.get("/", (req, res) => {
  res.send("HOLA MUNDO");
});



router.post("/login", login);
router.post("/register", register);
router.post("/newTweet", addNewTweet)
router.get("/getTweetsByUserId/:userId", findTweetsByUserId)
router.get("/getSearchResults/:text", find)

module.exports = router;
