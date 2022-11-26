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
  const { tweetId, username, userId, comment } = req.body;

  const findTweet = await Tweet.updateOne()
  console.log(findTweet);
  await findTweet.comments.push({ id,
    username, userId, comment, date
})
// await findTweet.save()

  res.json({ data: findTweet })
};

module.exports = { addNewTweet, findTweetsByUserId, deleteTweetById,postNewComment }
