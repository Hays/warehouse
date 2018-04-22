import fs from 'fs'

export function homeHandle(ctx, next) {
  console.log(__dirname)
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream('./client/public/index.html')
}

