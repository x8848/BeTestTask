const Sequelize = require('sequelize')

module.exports = {
  secretKey: 'secret',
  token: 'x-token',
  saltRounds: 10,
  postsLimit: 10,
  port: 3000,
  sequelize: new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:'
  }),
};