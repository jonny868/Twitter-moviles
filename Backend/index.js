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
app.use(express.json())

require('./database')

app.use(routes)
app.listen(port, () => console.log(`App started on port: ${port}`))