
const Sequelize = require('sequelize');
const config = require('../config/config.js');


//创建连接池
let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
      max: 5,
      min: 0,
      idle: 30000
  }
});

//初始化表格模型
let PetRep = sequelize.define('replyinfo', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
  message: Sequelize.STRING(100),
  username: Sequelize.STRING(100),
  to_who:Sequelize.STRING(100),
  self_id:Sequelize.STRING(100)
}, {
      timestamps: false
  });

    module.exports = PetRep