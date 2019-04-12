
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
let PetRep = sequelize.define('reportInfo', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
  house_id:Sequelize.STRING(100),
  who_report: Sequelize.STRING(100),
  textareaReport: Sequelize.STRING(100)
}, {
      timestamps: false
  });

    module.exports = PetRep