const {Schema, model} = require('mongoose')


const UserSchema = new Schema({
    id:{
        type:String
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
        // select: false
    },
    date:{
        type: String
    },
    profilePicture: {
        type: String,
        default:'https://res.cloudinary.com/dqwbl8iq2/image/upload/v1668872408/default-profile-pic-e1513291410505_svzzt5.jpg'
    },
    bio:{
        type: String,
        default:''
    }

})

module.exports = model('User', UserSchema)