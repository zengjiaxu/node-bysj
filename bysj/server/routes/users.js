const router = require('koa-router')()
const nodeMailer = require('nodemailer') //使用nodemail包发送邮件
const axios = require('axios')
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
let Pet = sequelize.define('user', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
  username: Sequelize.STRING(100),
  password: Sequelize.STRING(100),
  email: Sequelize.STRING(100)
}, {
      timestamps: false
  });

router.prefix('/users')
//注册接口
router.post('/register',async function (ctx, next) {
  if(ctx.request.body){
    const {user,pass,email} = ctx.request.body
    await Pet.findAll({
      where:{
        username:user
      }
    }).then((p)=>{
      for (let i of p) {
        var res = JSON.stringify(i)
    }
    if(!res){
      //插入数据
      Pet.create({
        username: ctx.request.body.user,
        password:ctx.request.body.pass,
        email: ctx.request.body.email
        }).then(function (p) {
          console.log('created.' + JSON.stringify(p));
        }).catch(function (err) {
          console.log('failed: ' + err);
        })
      return new Promise((resolve,reject)=>{
        resolve("注册成功")
      })
    }else{
      return new Promise((resolve,reject)=>{
        resolve("用户名已存在")
      })
    }
    }).catch((err)=>{
        console.log('failed: ' + err);
    }).then((x)=>{
      ctx.body = {
        code:1,
        msg:x
      }
    })
    }
    })

//登录接口
router.post('/login',async function (ctx, next) {
  const {user,pass,msg} = ctx.request.body
  if(msg){
    ctx.body = {
      code: 1,
      msg: '登录成功',
      sess: ctx.session.user
    }
  }else
  {
    await Pet.findAll({
      where:{
        username: ctx.request.body.user,
      }
    }).then((p)=>{
      for (let i of p) {
          var res = JSON.stringify(i)
      }
      var objUser = JSON.parse(res)
      console.log(objUser.password)
      return new Promise((res,rej)=>{
        res(objUser.password)
      })
    }).catch((err)=>{
      console.log('failed: ' + err);
    }).then((password) => {
      if(!ctx.session.isNew){//判断会话是不是新的
        ctx.set("Access-Control-Allow-Credentials", true)//允许跨域设置cookie
        ctx.session.user = user
        ctx.session.pass = pass
        ctx.body = {
          code:3,
          sess:ctx.session.user,
          msg:'请不要重复登录'
        }
      }
      else if(pass === password){
        ctx.set("Access-Control-Allow-Credentials", true)//允许跨域设置cookie
        ctx.session.user = user
        ctx.session.pass = pass
        ctx.body = {
          code: 1,
          msg: '登录成功',
          sess: ctx.session.user
        }
      }else{
        ctx.body = {
          code:0,
          msg: '账号或密码错误'
        }
      }
    })
  }
  
  
})


//验证码接口
router.post('/verify',async (ctx,next)=>{
  let transporter = nodeMailer.createTransport({//发送对象
    host: 'smtp.qq.com',
    port: 465,
    secure: true, 
    auth: {
      user: '79858318@qq.com',
      pass: 'hdykcwckepgabhah'
    }
  })
  let ko = {
    code: Math.random().toString(16).slice(2,6).toUpperCase(),
    //expire: new Date().getTime+60*60*1000,
    email: ctx.request.body.email,
    user: ctx.request.body.user
  }
  let mailOptions = {//发送内容
    from: '"认证邮件" <79858318@qq.com>',
    to: ko.email,
    subject: '忘记密码的验证码',
    html: `你的验证码是${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('错误是:'+error)
    } 
  })
  await Pet.update({
    password: ko.pass//修改的字段对应的内容
  }, {
      where: {
        username: ko.user//查询条件
      }
    })
    .then(((p)=>{
      for(let i of p){
        console.log(JSON.stringify(i))
      }
    })).catch(err => console.log('failed: ' + err)).then(()=>{
      ctx.body = {
        code: 1,
        msg: '验证码已发送'
      }
    })
  axios.post('http://localhost:3000/users/forget',{
    code:ko.code
  }).then((res)=>{console.log(res)})
})


//验证验证码是否正确
let code
router.post('/forget',async (ctx,next)=>{
  if(ctx.request.body.code){
     code  = ctx.request.body.code
     console.log(code)
     ctx.body = {
       msg:"请求成功"
     }
  }else{ 
    console.log(code)
    if(ctx.request.body.yzm === code){
      ctx.body={
        code:"1",
        msg:"验证成功"
      }
    }else{
      ctx.body = {
        code:"0",
        msg:"验证失败"
      }
    }
  }

})

//修改密码
router.post('/updatePass',async function (ctx,next) {
  if(ctx.request.body){
    const {newPass,username} = ctx.request.body
    await Pet.update({
       password:newPass
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


//退出接口
router.post('/Exit',function (ctx,next) {
 ctx.body = {
   msg:'退出成功'
 }
})


module.exports = router
