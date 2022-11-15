const mongoose = require('mongoose');

const MONGOURI= 'mongodb+srv://jonny868:dbpassword22@training.t7kezly.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(
    db => {console.log('DB CONNECTED')}
).catch(err => console.error(err))