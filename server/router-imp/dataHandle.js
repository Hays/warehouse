import { addCategory } from '../model/warehouse-item'
import fs from 'fs'

function addItem(ctx, next) {
}

function listAllItems(ctx, next) {

}

function removeItem(ctx, next) {
    
}

async function handleAddCategory(ctx, next) {
  let param = ctx.request.body
  if (param.name) {
    console.log(`will add category .... ${param.name}`)
    try {
      let ret = await addCategory(param.name)
      console.info(`add category success, ${ret}`)
      ctx.status = 200
      // TODO: 这里需要转换一次，只把必要的字段提取出来返回出去
      ctx.body = JSON.stringify(ret)
    } catch (e) {
      console.error(e)
      ctx.status = 400
      ctx.body = 'add category failed!'
    }
  } else {
    console.warn('handle add category, param error: name is blank!')
    ctx.status = 400
    ctx.body = 'Name can not be blank!'
  }
}

export default {
  addItem,
  listAllItems,
  removeItem,
  handleAddCategory
}