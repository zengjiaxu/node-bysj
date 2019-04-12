const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const session = require('koa-session')
const users = require('./routes/users')
const userInfo = require('./routes/userInfo')
const houseInfo = require('./routes/commenInfo')
const commenInfo = require('./routes/houseInfo')
const replyInfo = require('./routes/replyInfo')
const appointment = require('./routes/appointment')
const report = require('./routes/report')
const Sequelize = require('sequelize');
const config = require('./config/config.js');

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//cors
app.use(cors({
  origin: 'http://localhost:1344',
  credentials: true
}))

//session
let options = {
  key: 'session_id', /** cookie的名称，可以不管 */
  maxAge: 21600000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: false, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
}
app.keys = ['some secret hurr']
app.use(session(options,app));

// routes
app.use(users.routes(), users.allowedMethods())
app.use(userInfo.routes(), userInfo.allowedMethods())
app.use(houseInfo.routes(), userInfo.allowedMethods())
app.use(commenInfo.routes(), commenInfo.allowedMethods())
app.use(replyInfo.routes(), replyInfo.allowedMethods())
app.use(appointment.routes(), appointment.allowedMethods())
app.use(report.routes(), report.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
