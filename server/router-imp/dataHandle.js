import { addCategory } from '../model/warehouse-item'
import fs from 'fs'

function addItem(ctx, next) {
}

function listAllItems(ctx, next) {

}

function removeItem(ctx, next) {
    
}

function handleAddCategory(ctx, next) {
  let param = ctx.request.body
  if (param.name) {
    console.log(`test by Hays .... ${param.name}`)
    ctx.status = 200
    ctx.body = JSON.stringify({id: 11})
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