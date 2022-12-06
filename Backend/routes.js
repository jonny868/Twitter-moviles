const { Router } = require("express");
const {login, find, register, setFavorite, followUser} = require('./controllers/userCtrl');
const  {addNewTweet, findTweetsByUserId, deleteTweetById,postNewComment, findCommentsByTweetId, setLike, deleteComment}  = require("./controllers/tweet");

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
router.post("/deleteCommentById", deleteComment)
router.post("/setLike", setLike)
router.post("/setFavorite", setFavorite)
router.get("/getCommentsByTweet/:tweetId", findCommentsByTweetId)
router.post("/followuser", followUser)

module.exports = router;
