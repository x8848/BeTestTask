const express = require('express')
const path = require('path')
const config = require('./config')
const bodyParser = require('body-parser')
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', userRouter)
app.use('/posts', postRouter)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'))
});

var server = app.listen(config.port, () =>
  console.log(`Example app listening on port ${config.port}!`))