const User = require('../models/User');

const register = async (req,res) => {
    console.log(req)
    const {username, email, password, date} = req.params
}

module.exports = register;