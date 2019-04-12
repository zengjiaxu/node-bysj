const router = require('koa-router')()
const Pet = require('../sqlModel/appointmentModel')
const Sequelize = require('sequelize');
  router.prefix('/appointment')
  
  router.post('/InsertAppointmentInfo',async (ctx,next)=>{
      console.log(111)
    if(ctx.request.body){
      const{appointment_user,receive_user,appoint_msg_date,appoint_msg_phone,return_msg,which_house} = ctx.request.body
      console.log(appointment_user,receive_user,appoint_msg_date,appoint_msg_phone,return_msg);
      
      await Pet.create({appointment_user,receive_user,appoint_msg_date,appoint_msg_phone,return_msg,which_house}).then(function (p) {
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
    }
  })

  //获取预约的信息
  router.post('/GetAppointmentInfo',async (ctx,next)=>{
      const {username} = ctx.request.body
    if(username){
        await Pet.findAll({
            where:{
                receive_user:username,
                return_msg:null
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
            data:'您尚未登录'
        }
    }
  })

 //已经回复的信息标记
  router.post('/UpdateAppointmentInfo',async function (ctx,next) {
    const {id,return_msg,username} = ctx.request.body
    if (username){
        await Pet.update({
            return_msg
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
                  if(return_msg === 1) {
                    res("接受预约成功")
                  }
                  if(return_msg === 2) {
                      res("已拒绝")
                  }
                    
              })
            })).catch((err) => {
                console.log('failed: ' + err)
                return new Promise(()=>{(res,rej)=>{
                    res("操作无效，服务器错误")
              }})
        }).then((x)=>{
              ctx.body = {
                code: 1,
                msg: x
              }
            })
    }else{
      ctx.body = {
        code: 1,
        msg: "请先登录"
      }
    }
      
  })


  //获取预约回复
  router.post('/GetAppointmentReply',async (ctx,next)=>{
    const {username} = ctx.request.body
  if(username){
      await Pet.findAll({
          where:{
            appointment_user:username,
            return_msg:{
                [Sequelize.Op.ne]:null
            }
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
          data:'您尚未登录'
      }
  }
})
  module.exports = router