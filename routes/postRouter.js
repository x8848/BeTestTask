const express = require('express')
const router = express.Router()
const config = require('../config')
const middleware = require('../middleware')
const uuid = require('uuid/v4')

Post = require('../models/post')

router.get('', (req, res) => {
    let limit = req.query.limit ? req.query.limit : config.postsLimit;
    Post.findAll({ limit: limit, order: [['created_at', 'DESC']] }).then(posts => {
        res.status(200).json(posts)
    })
})

router.get('/:id', (req, res) => {
    Post.findByPk(req.params.id).then(post => {
        post ? res.status(200).json(post) : res.status(401).send('No post found by Id')
    })
})

router.post('', middleware.checkToken, (req, res) => {
    Post.create({ id: uuid(), title: req.body.title, body: req.body.body, author_id: req.decoded.id }).then(post => {
        res.status(200).json(post)
    });
})

module.exports = router;