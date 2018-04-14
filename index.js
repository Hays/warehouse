import Koa from 'koa'
import Router from 'koa-router'
import initRouterHandler from './js/router-imp'

var app = new Koa()
var router = new Router()

const logger = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
    next()
}
app.use(logger)

initRouterHandler(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8080)