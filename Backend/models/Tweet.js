const {Schema, model} = require('mongoose')



const TweetSchema = new Schema({
    id: String,
    content: String,
    owner: String,
    userId: String,
    date: {
        type: String
    },
    likesCount: {Number, default:0},
    Likes:[],
    comments:[]
})

module.exports = model('Tweet', TweetSchema)