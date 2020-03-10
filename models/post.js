const { Sequelize, Model } = require('sequelize')
const uuid = require('uuid/v4');
const sequelize = require('../config.js').sequelize

class Post extends Model { }
Post.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUIDV4,
    defaultValue: uuid()
  },
  title: {
    type: Sequelize.STRING(128),
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author_id: {
    type: Sequelize.UUIDV4,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  sequelize: sequelize,
  modelName: 'posts',
  timestamps: false,
});

Post.sync({ force: true }).then(() => console.log("Post table created"));

module.exports = Post
