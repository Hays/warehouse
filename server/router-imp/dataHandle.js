import {
  addCategory,
  addBatch,
  addBrand,
  getAllCategory,
  getAllBrands,
  getAllItems,
  addItem
} from '../model/warehouse-item'

async function handleAddItem (ctx, next) {
  let params = ctx.request.body
  if (!params.name && !params.brandId && params.categoryId) {
    console.warn(`add item failed for params invalid, name: ${params.name}, brandId: ${params.brandId}, categoryId: ${params.categoryId}`)
    ctx.status = 400
    ctx.body = 'add item failed, reason: params invalid'
    return
  }
  let desc = params.desc ? params.desc : ''
  try {
    let ret = await addItem(params.name, desc, params.brandId, params.categoryId)
    console.info(`add item success, ${ret}`)
    ctx.status = 200
    let resp = {
      code: 0,
      data: {
        id: ret._id,
        name: ret.name,
        desc: ret.desc,
        brand: ret.brand,
        category: ret.category
      }
    }
    ctx.body = JSON.stringify(resp)
  } catch (e) {
    ctx.status = 400
    ctx.body = 'add item failed'
    console.error(`add item failed, reason: ${e}`)
  }
}

async function handleGetAllItems (ctx, next) {
  ctx.status = 200
  let ret = await getAllItems()
  let data = ret.map(item => {
    let cat = {
      id: item.category._id,
      name: item.category.name
    }
    let brand = {
      id: item.brand._id,
      name: item.brand.name
    }
    return {
      id: item._id,
      name: item.name,
      brand: brand,
      category: cat,
      desc: item.desc,
      updated: item.updated,
      count: item.count
    }
  })
  let resp = {
    code: 0,
    data: data
  }
  ctx.body = JSON.stringify(resp)
}

function removeItem (ctx, next) {

}

async function handleAddCategory (ctx, next) {
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

async function handleAddBrand (ctx, next) {
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

async function handleGetCategorys (ctx, next) {
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

async function handleGetBrand (ctx, next) {
  ctx.status = 200
  let ret = await getAllBrands()
  let data = ret.map(brand => ({
    id: brand._id,
    name: brand.name
  }))
  let resp = {
    code: 0,
    data: data
  }
  ctx.body = JSON.stringify(resp)
}

export default {
  handleAddItem,
  handleGetAllItems,
  removeItem,
  handleAddCategory,
  handleAddBrand,
  handleGetCategorys,
  handleGetBrand
}
