const Tweet = require("../models/Tweet");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const { findOneAndDelete } = require("../models/Tweet");

const addNewTweet = async (req, res) => {
  const { content, userId, owner } = req.body;
  const id = uuidv4();
  const date = moment([]).format("LLL");

  const newTweet = new Tweet({ userId, content, id, date, owner });
  await newTweet.save();
  res.status(200).json({
    ok: true,
    message: "Tweet added successfully",
  });
};

const findTweetsByUserId = async (req, res) => {
  const { userId } = req.params;
  const findTweets = await Tweet.find({ userId });
  
  if (findTweets) {
    return res.json(findTweets);
  } else {
    return res.status(404).json({
      ok: false,
      message: "Tweets not found",
    });
  }
};

const deleteTweetById = async (req, res) => {
  const tweetId = req.body.data
  await Tweet.deleteOne({tweetId})
  res.status(200).json({
    status: 200,
    message: "Tweet deleted successfully",
  })
}

const postNewComment = async (req, res) => {
  const id = uuidv4();
  const date = moment().format('YYYY-MM-DD')
  const { tweetId, username, userId, content } = req.body;
  console.log(req.body)

  const findTweet = await Tweet.findOneAndUpdate({tweetId: tweetId}, {$push:{comments:[{id: id, date: date,owner:username,userId, comment:content}]}})
  await findTweet.save()
  

  res.json({ data: findTweet })
};

const setLike = async (req, res) => {
  const {userId, tweetId, tweeIsLiked} = req.body
  const tweet = await Tweet.find({'id':tweetId})
  console.log(tweet[0].likes)
  await Tweet.updateOne({'id':tweetId}, {'tweet[0].likes': tweet[0].likes +1})
  console.log(tweet[0].likes)
  

}



const findCommentsByTweetId = async (req, res) => {
 const {tweetId} = req.params
 console.log(tweetId)
 const findComments = await Tweet.find({id:tweetId})
 console.log(findComments[0].comments)
 res.status(200).json(findComments[0].comments)
 
}


module.exports = { addNewTweet, findTweetsByUserId, deleteTweetById,postNewComment,setLike, findCommentsByTweetId }
