const express = require('express')
const router = express.Router()
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')
const config = require('../config')
const path = require('path')

User = require('../models/user')

let getAuthToken = function (req, res, next) {
    User.findOne({ where: { 'userName': req.body.userName } }).then(user => {
      if (!user) return res.status(401).send('There is no user with such name')
      if (user.isValidPassword(req.body.password)) {
        let token = jwt.sign({ id: user.id }, config.secretKey, { expiresIn: '1h' })
        res.decoded = token;
        next()
      }
      else
        res.status(401).send('Password is not correct')
    })
  }

router.post('', (req, res) => {
    User.findOne({ where: { 'userName': req.body.userName } }).then(user => {
      if (user) res.status(401).send('Name already exists. Choose another name.')
      else {
        User.create({ id: uuid(), userName: req.body.userName, password: req.body.password }).then(user => {
          res.status(200).send(jwt.sign({ id: user.id }, config.secretKey, { expiresIn: '1h' }))
        }).catch((err) => {
          res.status(500).send(err)
        })
      }
    })
  })
  
  router.post('/auth', getAuthToken, (req, res) => {
    let token = res.decoded;
    if (token) res.status(200).send(token)
  })
  
  router.post('/login', getAuthToken, (req, res) => {
    let token = res.decoded;
    if (token) res.cookie('token', token).sendFile(path.join(__dirname + '/../views/post.html'))
  })

  module.exports = router