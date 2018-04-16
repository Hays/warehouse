import Koa from 'koa'
import Router from 'koa-router'
import initRouterHandler from './router-imp'
import { initDB } from './model/database'

var app = new Koa()
var router = new Router()

initDB()

const logger = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
    next()
}
app.use(logger)

initRouterHandler(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8080)