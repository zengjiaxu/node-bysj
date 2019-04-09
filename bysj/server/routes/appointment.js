const router = require('koa-router')()
const Pet = require('../sqlModel/appointmentModel')

  router.prefix('/appointment')
  
  router.post('/InsertAppointmentInfo',async (ctx,next)=>{
    const{appointment_user,receive_user,appoint_ms,return_m} = ctx.request.body
    if(username){
      await Pet.create({appointment_user,receive_user,appoint_ms,return_m}).then(function (p) {
        console.log('created.' + JSON.stringify(p))
      return new Promise((resolve,reject)=>{
          resolve('申请预约成功，请等待房主反馈')
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
        code:0,
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