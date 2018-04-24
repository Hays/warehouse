import { addCategory, addBatch, addBrand, getAllCategory } from '../model/warehouse-item'
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
      let resp = {
        code: 0,
        data: {
          id: ret._id,
          name: ret.name
        }
      }
      ctx.body = JSON.stringify(resp)
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

async function handleAddBrand(ctx, next) {
  let param = ctx.request.body
  if (param.name) {
    console.log(`will add brand .... ${param.name}`)
    try {
      let ret = await addBrand(param.name)
      console.info(`add brand success, ${ret}`)
      ctx.status = 200
      let resp = {
        code: 0,
        data: {
          id: ret._id,
          name: ret.name
        }
      }
      ctx.body = JSON.stringify(resp)
    } catch (e) {
      console.error(e)
      ctx.status = 400
      ctx.body = 'add brand failed!'
    }
  } else {
    console.warn('handle add brand, param error: name is blank!')
    ctx.status = 400
    ctx.body = 'Name can not be blank!'
  }
}

async function handleGetCategorys(ctx, next) {
  ctx.status = 200
  let ret = await getAllCategory()
  let data = ret.map(cat => ({
    id: cat._id,
    name: cat.name
  }))
  let resp = {
    code: 0,
    data: data
  }
  ctx.body = JSON.stringify(resp)
}

export default {
  addItem,
  listAllItems,
  removeItem,
  handleAddCategory,
  handleAddBrand,
  handleGetCategorys
}