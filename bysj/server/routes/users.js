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
     // 增加数据（注册）
     await Pet.create({
        username: ctx.request.body.user,
        password:ctx.request.body.pass,
        email: ctx.request.body.email
        }).then(function (p) {
          console.log('created.' + JSON.stringify(p));
        }).catch(function (err) {
          console.log('failed: ' + err);
        }).then(()=>{
          ctx.body={
            code:1,
            msg:'注册成功'
          }
        })
      }
    })

//登录接口
router.post('/login',async function (ctx, next) {
  const {user,pass} = ctx.request.body
  if(!ctx.session.isNew){//判断会话是不是新的
    console.log(ctx.session.session_id)
    ctx.body = {
      code:3,
      user:ctx.session.user,
      msg:'请不要重复登录'
    }
  }
  else if(user === 'admin' && pass === '123456'){
    ctx.set("Access-Control-Allow-Credentials", true)//允许跨域设置cookie
    ctx.session.user = user
    ctx.session.pass = pass
    /*ctx.cookies.set(
      'user',user,{
          domain:'localhost', // 写cookie所在的域名
          path:'/',       // 写cookie所在的路径
          maxAge: 7200000,   // cookie有效时长
          expires:new Date('2029-03-08'), // cookie失效时间
          httpOnly:false,  // 是否只用于http请求中获取
          overwrite:true,  // 是否允许重写
          signed:true
      })
       ctx.cookies.set(
        'pass',pass,{
            domain:'localhost', // 写cookie所在的域名
            path:'/',       // 写cookie所在的路径
            maxAge: 7200000,   // cookie有效时长
            expires:new Date('2029-03-08'), // cookie失效时间
            httpOnly:false,  // 是否只用于http请求中获取
            overwrite:true,  // 是否允许重写
            signed:true
        }) */
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
    pass: Math.random().toString(16).slice(2,8).toUpperCase(),
    //expire: new Date().getTime+60*60*1000,
    email: ctx.request.body.email
  }
  let mailOptions = {//发送内容
    from: '"认证邮件" <79858318@qq.com>',
    to: ko.email,
    subject: '忘记密码的验证码',
    html: `你的验证码是${ko.code}新密码是${ko.pass}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('错误是:'+error)
    } 
  })
  ctx.body = {
    code: 1,
    msg: '验证码已发送'
  }
  axios.post('http://localhost:3000/users/forget',{
    code:ko.code
  }).then((res)=>{console.log(res)})
})


//验证验证码是否正确
let code
router.post('/forget',async (ctx,next)=>{
  if(ctx.request.body.code){
     code  = ctx.request.body.code
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

//退出接口
router.post('/Exit',function (ctx,next) {
 ctx.body = {
   msg:'退出成功'
 }
})

//上传信息
router.post('/InsertUserInfo',function (ctx,next) {
  //数据库插入操作
  //...相应逻辑
  ctx.body={
    msg:'上传成功'
  }
})
//获取用户信息
router.post('/GetUserInfo',function (ctx,next) {
//数据库查询操作
//...相应逻辑
// if('查询失败'){
//   ctx.body = {
//     msg:'请上传个人信息'
//   }
// }
})


module.exports = router
