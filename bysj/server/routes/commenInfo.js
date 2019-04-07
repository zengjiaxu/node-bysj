
const router = require('koa-router')()
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
let Pet = sequelize.define('commenInfo', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
  message: Sequelize.STRING(100),
  username: Sequelize.STRING(100),
  commen_id:Sequelize.STRING(100)
}, {
      timestamps: false
  });

  router.prefix('/commen')

//上传信息
router.post('/InsertCommenInfo',async function (ctx,next) {
    //数据库插入操作
  const {username,message,id:commen_id} = ctx.request.body
  console.log(username,message)
  if(username){
     await Pet.create({commen_id,username,message}).then(function (p) {
        console.log('created.' + JSON.stringify(p))
      }).catch(function (err) {
        console.log('failed: ' + err);
      })
      return new Promise((resolve,reject)=>{
          resolve('留言成功')
      }).catch((err)=>{
      console.log('failed',err)
      }).then((x)=>{
      ctx.body={
          code:1,
          msg:x
      }
      })
      
  }else{
    ctx.body={
      code:1,
      msg:"请先登录"
  }
  }
  
    })

    router.post('/GetIdCommen',async (ctx,next)=>{
      const {id:commen_id} = ctx.request.body
      if(commen_id){
        await Pet.findAll({
          where:{commen_id}
        }).then((p)=>{
          let res = []
          for (let i of p) {
            res.push(JSON.stringify(i))
        }
        console.log(res)
        return new Promise((resolve,reject)=>{
            resolve(res)
        })
      }).catch((err)=>{
        console.log('failed',err)
        }).then((res)=>{
          if(res){
            ctx.body={
              code:1,
              data:res
          }
          }else{
            ctx.body={
              code:0,
              data:"未找到信息"
          }
          }
      
        }).catch((err)=>{
            console.log('failed',err)
            })
      }
    })

router.post('/GetIdHouse',async (ctx,next) => {
const {id} = ctx.request.body
if(id){
  console.log("!11")
  await Pet.findAll({
    where:{
      id
    }
  }).then((p)=>{
      for (let i of p) {
        var res = JSON.stringify(i)
        console.log(res)
    }
    return new Promise((resolve,reject)=>{
        resolve(res)
    })
  }).catch((err)=>{
    console.log('failed',err)
    }).then((res)=>{
      if(res){
        ctx.body={
          code:1,
          data:res
      }
      }else{
        ctx.body={
          code:0,
          data:"未找到信息"
      }
      }

    }).catch((err)=>{
        console.log('failed',err)
        })
}
})
router.post('/GetUserHouse',async (ctx,next)=>{
  const {username} = ctx.request.body
  if(username){
  await Pet.findAll({
    where:{
      username
    }
  }).then((p)=>{
    let res = []
    for (let i of p) {
      res.push(JSON.stringify(i))
  }
  console.log(res)
  return new Promise((resolve,reject)=>{
      resolve(res)
  })
}).catch((err)=>{
  console.log('failed',err)
  }).then((res)=>{
    if(res){
      ctx.body={
        code:1,
        data:res
    }
    }else{
      ctx.body={
        code:0,
        data:"未找到信息"
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
router.post('/deleteUserHouse',async (ctx,next) => {
  const {id} = ctx.request.body
  await Pet.destroy({
    where:{
        id
    }
}).then(()=>{
  return new Promise((resolve,reject)=>{
    resolve("删除成功")
  })
}).catch((err)=>{
  console.log('failed',err)
  }).then((res)=>{
    if(res){
      ctx.body = {
        code:1,
        data:res
      }
    }
  }).catch((err)=>{
    console.log('failed',err)
    })
})
router.post('/GetAllHouse',async (ctx,next)=>{
  await Pet.findAll().then((p)=>{
    let res = []
    for (let i of p) {
      res.push(JSON.stringify(i))
  }
  console.log(res)
  return new Promise((resolve,reject)=>{
      resolve(res)
  })
}).catch((err)=>{
  console.log('failed',err)
  }).then((res)=>{
    if(res){
      ctx.body={
        code:1,
        data:res
    }
    }else{
      ctx.body={
        code:0,
        data:"未找到信息"
    }
    }

  }).catch((err)=>{
      console.log('failed',err)
      })
})
module.exports = router