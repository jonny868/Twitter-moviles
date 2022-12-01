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
  const date = moment().format('LLL')
  const { tweetId, username, userId, content } = req.body;
  // console.log(req.body)
  if(content!=='' || null){
    await Tweet.updateOne({tweetId}, {'$push':{'comments':{ id, date, content, userId, username }}})
  }

  
  

};

//FIX, ITS BUGGED A S
const setLike = async (req, res) => {
  const {tweetId, liked , user} = req.body
  // console.log(req.body)
  if(liked){
    await Tweet.updateOne({tweetId},{'$inc': { "likesCount": 1 },  "$push":{'Likes': user}})
    return res.json({
      message: 'Tweet liked'
    })

  }
  else if(!liked) {
    await Tweet.updateOne({tweetId},{'$inc': { "likesCount": -1 },  "$pull":{'Likes': user}})
    return res.json({
      message: 'Like removed'
    })
  }
  
  

}

const setFavorite = async (req, res)=>{
console.log('Favorite')

}



const findCommentsByTweetId = async (req, res) => {
 const {tweetId} = req.params
 console.log(tweetId)
 const findComments = await Tweet.find({id:tweetId}).sort({date: -1})
 console.log(findComments[0].comments)
 res.status(200).json(findComments[0].comments)
 
}

const deleteComment = async (req, res)=>{
  const {id, tweetId} = req.body
  console.log(req.body)
  await Tweet.findOneAndUpdate({tweetId},{"$pull":{'comments':{id:id}}} )
  return res.json({
    message:'Comment Deleted'
  })
}


module.exports = { addNewTweet, findTweetsByUserId, deleteTweetById,postNewComment,setLike, findCommentsByTweetId, setFavorite, deleteComment }
