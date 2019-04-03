const router = require('koa-router')()
const Sequelize = require('sequelize');
const config = require('../config/config.js');
const Koa = require('koa')
const app = new Koa()

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
let Pet = sequelize.define('userInfo', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
  user: Sequelize.STRING(100),
  age: Sequelize.STRING(100),
  identity: Sequelize.STRING(100),
  address: Sequelize.STRING(100),
  email: Sequelize.STRING(100),
  username: Sequelize.STRING(100)
}, {
      timestamps: false
  });

  router.prefix('/users')

//上传信息
router.post('/InsertUserInfo',async function (ctx,next) {
  //数据库插入操作
  if(ctx.request.body){
    const {user,age,identity,address,email,username} = ctx.request.body
    await Pet.findAll({
      where:{
        username:username
      }
    }).then((p)=>{
      for (let i of p) {
        var res = JSON.stringify(i)
    }
        if(!res){    
        Pet.create({
        user,
        age,
        identity,
        address,
        email,
        username
        }).then(function (p) {
          console.log('created.' + JSON.stringify(p))
        }).catch(function (err) {
          console.log('failed: ' + err);
        })
        return new Promise((resolve,reject)=>{
            resolve('上传成功')
        })
    }else{
        return new Promise((resolve,reject)=>{
            resolve('请勿重复上传')
        })
    }
}).catch((err)=>{
console.log('failed',err)
}).then((x)=>{
ctx.body={
    code:1,
    msg:x
}
})
}
    })
//修改用户信息
router.post('/UpdateUserInfo',async function (ctx,next) {
    if(ctx.request.body){
        const {user,age,identity,address,email,username} = ctx.request.body
        await Pet.update({
            user,
            age,
            identity,
            address,
            email,
            username
          }, {
              where: {
                username//查询条件
              }
            })
            .then(((p)=>{
              for(let i of p){
                console.log(JSON.stringify(i))
              }
              return new Promise((res,rej)=>{
                    res("修改成功")
              })
            })).catch((err) => {
                console.log('failed: ' + err)
                return new Promise(()=>{(res,rej)=>{
                    res("修改失败")
              }})
        }).then((x)=>{
              ctx.body = {
                code: 1,
                msg: x
              }
            })
    }
})


module.exports = router