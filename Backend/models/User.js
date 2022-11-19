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
    },
    date:{
        type: String
    }

})

module.exports = model('User', UserSchema)