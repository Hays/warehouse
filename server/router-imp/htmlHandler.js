import fs from 'fs'

export function homeHandle(ctx, next) {
    console.log(__dirname)
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./client/index.html')
    // TODO: js文件路径也要加到路由去
    // TODO: 静态文件路由
}

export function bundleJSHandle(ctx, next) {
    ctx.response.type = 'text/plain; charset=utf-8'
    ctx.response.body = fs.createReadStream('./client/dist/main.bundle.js')
}

