import Koa from 'koa'
import serve from 'koa-static'
import path from 'path'
import Router from 'koa-router'
import fs from 'fs'

var app = new Koa()
var router = new Router()

app.use(serve(path.join(__dirname, '.', 'public')))

router.get('*', function (ctx, next){
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream(path.join(__dirname, '.', 'public/index.html'))
})
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(8080)