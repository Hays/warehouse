import Koa from 'koa'
import serve from 'koa-static'
import path from 'path'

var app = new Koa()

app.use(serve(path.join(__dirname, '.', 'public')))
app.listen(8080)