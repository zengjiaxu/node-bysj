const router = require('koa-router')()
const nodeMailer = require('nodemailer') //使用nodemail包发送邮件
const axios = require('axios')

router.prefix('/users')
//注册接口
router.post('/register', function (ctx, next) {
  if(ctx.request.body){
    console.log(ctx.request.body)
    ctx.body = {
      code: 1,
      msg: '注册成功'
    }
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
      pass: 'sztpvzzofabobjfh'
    }
  })
  let ko = {
    code: Math.random().toString(16).slice(2,6).toUpperCase(),
    //expire: new Date().getTime+60*60*1000,
    email: ctx.request.body.email
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


module.exports = router
