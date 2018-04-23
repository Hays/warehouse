import Koa from 'koa'
import Router from 'koa-router'
import initRouterHandler from './router-imp'
import { initDB } from './model/database'
import path from 'path'
import bodyParser from 'koa-bodyparser'

var app = new Koa()
var router = new Router()

initDB()

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
  next()
}

// body parser也是不能放在logger之后，只能在最前面设置
app.use(bodyParser())
app.use(logger)
initRouterHandler(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8089)