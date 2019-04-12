
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
let Pet = sequelize.define('houseInfo', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
  imgUrl: Sequelize.STRING(100),
  houseLarge: Sequelize.STRING(100),
  phone: Sequelize.STRING(100),
  address: Sequelize.STRING(100),
  price: Sequelize.STRING(100),
  username: Sequelize.STRING(100),
  reviewed:Sequelize.STRING(100)
}, {
      timestamps: false
  });

  router.prefix('/house')

//上传信息
router.post('/InsertHouseInfo',async function (ctx,next) {
    //数据库插入操作
  const {imgUrl,houseLarge,phone,address,price,username} = ctx.request.body
  if(username){
    if(ctx.request.body){
    
      Pet.create({imgUrl,houseLarge,phone,address,price,username}).then(function (p) {
        console.log('created.' + JSON.stringify(p))
      }).catch(function (err) {
        console.log('failed: ' + err);
      })
      return new Promise((resolve,reject)=>{
          resolve('上传成功')
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
    ctx.body={
      code:1,
      msg:"请先登录"
  }
  }
  
    })
//修改房源信息
router.post('/updateHouseInfo',async function (ctx,next) {
  const {imgUrl,houseLarge,phone,address,price,username} = ctx.request.body
  if(username){
    if(ctx.request.body){
      await Pet.update({imgUrl,houseLarge,phone,address,price,username}, {
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
      code:1,
      msg:'请先登录'
    }
  }
 
})
router.post('/GetHouseInfo',async function (ctx,next) {
    const {username,id} = ctx.request.body
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
//获取全部房源信息
router.post('/GetAllHouse',async (ctx,next)=>{
  await Pet.findAll({
    where:{
      reviewed:'2'
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
})

//获取待审核的房源信息（待审核-->1   审核通过-->2  审核未通过-->3）
router.post('/GetAllReviewedHouse',async (ctx,next)=>{
  await Pet.findAll({
    where:{
      reviewed:'1'
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
})

//审核通过修改为2
router.post('/UpdateReviewedHouse',async (ctx,next)=>{
  const {id,reviewed} = ctx.request.body
    if(ctx.request.body){
      await Pet.update({reviewed}, {
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
  }
  
}
)

module.exports = router