
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
let Pet = sequelize.define('appointinfo', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
  appointment_user: Sequelize.STRING(100),
  receive_user: Sequelize.STRING(100),
  appoint_msg:Sequelize.STRING(100),
  return_msg:Sequelize.STRING(100)
}, {
      timestamps: false
  });

    module.exports = Pet