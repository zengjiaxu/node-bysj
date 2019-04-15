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
          await Pet.findAll({
              where:{
                  success:'1'
              }
          }).then((p)=>{
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
//审核通过修改为2或3
router.post('/UpdateSuccessReport',async (ctx,next)=>{
    const {id,success} = ctx.request.body
      if(ctx.request.body){
        await Pet.update({success}, {
              where: {
                id//查询条件
              }
            })
            .then(((p)=>{
              for(let i of p){
                console.log(JSON.stringify(i))
              }
              return new Promise((res,rej)=>{
                    res("已处理举报信息")
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