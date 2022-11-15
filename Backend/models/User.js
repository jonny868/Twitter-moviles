const {Schema, model} = require('mongoose')


const UserSchema = new Schema({
    name: {
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
    date: {
        type: Date,
        default: new Date.now
    }

})

module.exports = model('User', UserSchema)