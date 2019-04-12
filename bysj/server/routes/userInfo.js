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
  username: Sequelize.STRING(100),
  reviewed_user: Sequelize.STRING(100)
}, {
      timestamps: false
  });

  router.prefix('/users')

//上传信息
router.post('/InsertUserInfo',async function (ctx,next) {
  const {user,age,identity,address,email,username} = ctx.request.body
  if(username){
    if(ctx.request.body){
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
  }else{
    ctx.body = {
      code:1,
      msg:"请先登录"
    }
  }
  //数据库插入操作
  
    })
//修改用户信息
router.post('/UpdateUserInfo',async function (ctx,next) {
  const {user,age,identity,address,email,username} = ctx.request.body
  if (username){
    if(ctx.request.body){
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
  }else{
    ctx.body = {
      code: 1,
      msg: "请先登录"
    }
  }
    
})
router.post('/GetUserInfo',async function (ctx,next) {
    const {username} = ctx.request.body
    if(username){
        await Pet.findAll({
            where:{
              username:username
            }
          }).then((p)=>{
            console.log("res是")
            const newP = p.toString()
            console.log(newP)
            if(newP){
              console.log("有数据")
              for (let i of p) {
                var res = JSON.stringify(i)
                console.log("res是"+res)
            }
            return new Promise((resolve,reject)=>{
                resolve(res)
            })
            }else{
              console.log("没有数据")
              return new Promise((resolve,reject)=>{
                resolve("请先上传个人信息")
            })
          }
          }).catch((err)=>{
            console.log('错了',err)
            return new Promise((resolve,reject)=>{
                resolve("请先上传个人信息")
            })
            }).then((res)=>{
              if(res === "请先上传个人信息"){
                ctx.body={
                  code:0,
                  data:res
              }
              }else{
                ctx.body={
                  code:1,
                  data:res
              }
              }

            }).catch((err)=>{
                console.log('failed',err)
                })
    }else{
      ctx.body={
        code:0,
        data:"请先登录"
      }
    }
})

//获取未审核的用户信息
router.post('/getUnreviewedUser',async (ctx,next)=>{
  await Pet.findAll({
    where:{
      reviewed_user:'1'
    }
  }).then((p)=>{
    let resArr = []
    for (let i of p) {
      resArr.push(JSON.stringify(i))
      console.log("res是"+resArr)
  }
  return new Promise((resolve,reject)=>{
      resolve(resArr)
  })
  }).catch((err)=>{
    console.log('failed:'+err)
  }).then((x)=>{
    ctx.body = {
      code:1,
      data:x
    }
  })
})

//通过审核 --> '2'
router.post('/UpdateUnreviewedUser',async function (ctx,next) {
  const {id,reviewed_user} = ctx.request.body
      await Pet.update({
          reviewed_user
        }, {
            where: {
              id//查询条件
            }
          })
          .then(((p)=>{
            for(let i of p){
              console.log(JSON.stringify(i))
            }
            return new Promise((res,rej)=>{
                  res("已通过审核")
            })
          })).catch((err) => {
              console.log('failed: ' + err)
              return new Promise(()=>{(res,rej)=>{
                  res("操作失败")
            }})
      }).then((x)=>{
            ctx.body = {
              code: 1,
              msg: x
            }
          })
  
})
module.exports = router