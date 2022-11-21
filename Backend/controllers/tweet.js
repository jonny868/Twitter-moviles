const Tweet = require("../models/Tweet");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const addNewTweet = async (req, res) => {
  const { content, userId } = req.body;
  const id = uuidv4();
  const date = moment().format("LLL");

  const newTweet = new Tweet({ userId, content, id, date });
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

module.exports = { addNewTweet, findTweetsByUserId };
