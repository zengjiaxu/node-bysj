const router = require('koa-router')()
const Pet = require('../sqlModel/replyInfoModel')

  router.prefix('/reply')
  
  router.post('/InsertReplyInfo',async (ctx,next)=>{
    const{message,username,to_who,self_id} = ctx.request.body
    console.log(message,username,to_who)
    if(username){
      await Pet.create({message,username,to_who,self_id}).then(function (p) {
        console.log('created.' + JSON.stringify(p))
      return new Promise((resolve,reject)=>{
          resolve('回复成功')
        })
      }).catch((err)=>{
      console.log('failed',err)
      }).then((x)=>{
      ctx.body={
          code:1,
          msg:x
      }
      })
    }else{
      ctx.body = {
        code:1,
        msg:'请先登录'
      }
    }
    
  })

  router.post('/GetAllReply',async (ctx,next)=>{
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