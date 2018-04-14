import fs from 'fs'

export function homeHandle(ctx, next) {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./html/index.html')
}

