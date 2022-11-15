const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const morgan = require('morgan')

// const routes = require('../routes')
const app = express()
const port = 3000 || 4000

//Middlewares
app.use(cors())
app.use(morgan('dev'))

require('./database')

app.use(routes)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))