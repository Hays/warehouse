import Koa from 'koa'
import Router from 'koa-router'
import initRouterHandler from './router-imp'
import { initDB } from './model/database'
import serve from 'koa-static'
import path from 'path'

var app = new Koa()
var router = new Router()

initDB()

const logger = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
    next()
}

// 这里logger不能放前面，否则会导致静态路由失效
app.use(serve(path.join(__dirname, '../..', 'client/public')))
app.use(logger)
initRouterHandler(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8089)