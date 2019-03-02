const router = require('koa-router')()

router.prefix('/users')
//注册接口
router.post('/register', function (ctx, next) {
  if(ctx.request.body){
    ctx.body = {
      code: 1,
      msg: '注册成功'
    }
  }
})
//登录接口
router.post('/login', function (ctx, next) {
  if(ctx.request.body){
    ctx.body = {
      code: 1,
      msg: '登录成功'
    }
  }
})


module.exports = router
