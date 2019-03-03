const router = require('koa-router')()

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
  if(ctx.session.user){
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
    ctx.cookies.set(
      'user',user,{
          domain:'localhost', // 写cookie所在的域名
          path:'/',       // 写cookie所在的路径
          maxAge: 7200000,   // cookie有效时长
          expires:new Date('2029-03-08'), // cookie失效时间
          httpOnly:false,  // 是否只用于http请求中获取
          overwrite:true  // 是否允许重写
      })
      /* ctx.cookies.set(
        'pass',pass,{
            domain:'localhost', // 写cookie所在的域名
            path:'/',       // 写cookie所在的路径
            maxAge: 7200000,   // cookie有效时长
            expires:new Date('2029-03-08'), // cookie失效时间
            httpOnly:true,  // 是否只用于http请求中获取
            overwrite:true  // 是否允许重写
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


module.exports = router
