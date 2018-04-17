import Koa from 'koa'
import Router from 'koa-router'
import initRouterHandler from './router-imp'
import { initDB } from './model/database'
import serve from 'koa-static'

var app = new Koa()
var router = new Router()

initDB()

const logger = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
    next()
}
app.use(logger)

console.log(__dirname)
// app.use(serve(__dirname + '/router-imp'))
initRouterHandler(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8080)