const { Router } = require("express");
const {login, find, register} = require('./controllers/userCtrl');
const  {addNewTweet, findTweetsByUserId, deleteTweetById,postNewComment, findCommentsByTweetId, setLike}  = require("./controllers/tweet");

const router = Router();

router.get("/", (req, res) => {
  res.send("HOLA MUNDO");
});



router.post("/login", login);
router.post("/register", register);
router.post("/newTweet", addNewTweet)
router.get("/getTweetsByUserId/:userId", findTweetsByUserId)
router.get("/getSearchResults/:text", find)
router.post("/deleteTweetById", deleteTweetById)
router.post("/postNewComment", postNewComment)
router.post("/setLike", setLike)
router.get("/getCommentsByTweet/:tweetId", findCommentsByTweetId)

module.exports = router;
