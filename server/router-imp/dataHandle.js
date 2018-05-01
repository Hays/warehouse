import {
  addCategory,
  addBatch,
  addBrand,
  getAllCategory,
  getAllBrands,
  getAllItems,
  getBatchs,
  addItem,
  deleteCategory,
  deleteBrand,
  deleteItem
} from '../model/warehouse-item'

async function handleAddItem (ctx, next) {
  let params = ctx.request.body
  if (!params.name && !params.brandId && !params.categoryId) {
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

async function handleDeleteCategory (ctx, next) {
  let param = ctx.request.body
  if (param.categoryId) {
    console.log(`will delete category .... ${param.categoryId}`)
    try {
      let ret = await deleteCategory(param.categoryId)
      console.info(`delete category success, ${ret}`)
      ctx.status = 200
      let code = ret.ok ? 0 : -1
      let resp = {
        code: code,
        data: {}
      }
      ctx.body = JSON.stringify(resp)
    } catch (e) {
      console.error(e)
      ctx.status = 400
      ctx.body = 'delete category failed!'
    }
  } else {
    console.warn('handle delete category, param error: category id is blank!')
    ctx.status = 400
    ctx.body = 'category id can not be blank!'
  }
}

async function handleDeleteBrand (ctx, next) {
  let param = ctx.request.body
  if (param.brandId) {
    console.log(`will delete brand .... ${param.brandId}`)
    try {
      let ret = await deleteBrand(param.brandId)
      console.info(`delete brand success, ${ret}`)
      ctx.status = 200
      let code = ret.ok ? 0 : -1
      let resp = {
        code: code,
        data: {}
      }
      ctx.body = JSON.stringify(resp)
    } catch (e) {
      console.error(e)
      ctx.status = 400
      ctx.body = 'delete brand failed!'
    }
  } else {
    console.warn('handle delete brand, param error: brand id is blank!')
    ctx.status = 400
    ctx.body = 'brand id can not be blank!'
  }
}

async function handleDeleteItem (ctx, next) {
  let param = ctx.request.body
  if (param.itemId) {
    console.log(`will delete item .... ${param.itemId}`)
    try {
      let ret = await deleteItem(param.itemId)
      console.info(`delete item success, ${ret}`)
      ctx.status = 200
      let code = ret.ok ? 0 : -1
      let resp = {
        code: code,
        data: {}
      }
      ctx.body = JSON.stringify(resp)
    } catch (e) {
      console.error(e)
      ctx.status = 400
      ctx.body = 'delete item failed!'
    }
  } else {
    console.warn('handle delete item, param error: item id is blank!')
    ctx.status = 400
    ctx.body = 'item id can not be blank!'
  }
}

async function handleAddBatch (ctx, next) {
  let params = ctx.request.body
  if (!params.itemId && !params.count && !params.price) {
    console.warn(`add batch failed for params invalid, itemId: ${params.itemId}, count: ${params.count}, price: ${params.price}`)
    ctx.status = 400
    ctx.body = 'add batch failed, reason: params invalid'
    return
  }
  let source = params.source ? params.source : ''
  try {
    let ret = await addBatch(params.itemId, params.count, params.price, source)
    console.info(`add batch success, ${ret}`)
    ctx.status = 200
    let resp = {
      code: 0,
      data: {
        id: ret._id,
        itemId: ret.itemId,
        count: ret.count,
        stock: ret.count,
        source: ret.source
      }
    }
    ctx.body = JSON.stringify(resp)
  } catch (e) {
    ctx.status = 400
    ctx.body = 'add batch failed'
    console.error(`add batch failed, reason: ${e}`)
  }
}

async function handleGetBatchs (ctx, next) {
  ctx.status = 200
  let ret = await getBatchs(ctx.params.itemId)
  let data = ret.map(batch => {
    return {
      id: batch._id,
      itemId: batch.itemId,
      count: batch.count,
      stock: batch.stock,
      source: batch.source,
      created: batch.date
    }
  })
  let resp = {
    code: 0,
    data: data
  }
  ctx.body = JSON.stringify(resp)
}

export default {
  handleAddItem,
  handleAddBatch,
  handleGetAllItems,
  handleAddCategory,
  handleAddBrand,
  handleGetCategorys,
  handleGetBrand,
  handleGetBatchs,
  handleDeleteCategory,
  handleDeleteBrand,
  handleDeleteItem
}
