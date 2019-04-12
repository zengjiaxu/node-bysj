const router = require('koa-router')()
const Pet = require('../sqlModel/reportInfoModel')

  router.prefix('/report')
  
  router.post('/InsertReportInfo',async (ctx,next)=>{
    const{house_id,who_report,textareaReport} = ctx.request.body
    
    if(who_report){
      await Pet.create({house_id,who_report,textareaReport}).then(function (p) {
        console.log('created.' + JSON.stringify(p))
      return new Promise((resolve,reject)=>{
          resolve('举报成功请等待审核')
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

  router.post('/GetAllReportInfo',async (ctx,next)=>{
      if(ctx.request.body){
          await Pet.findAll().then((p)=>{
            let res = []
            for (let i of p) {
            res.push(JSON.stringify(i))
        }
        return new Promise((resolve,reject)=>{
            resolve(res)
        })
        }).catch((err)=>{
        console.log('failed',err)
        }).then((res)=>{
            ctx.body={
                code:1,
                data:res
            }
        }).catch((err)=>{
            console.log('failed',err)
            })
            }
        })

  
  module.exports = router