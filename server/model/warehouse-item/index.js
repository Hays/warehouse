import mongoose, { Schema } from '../database'

let ItemSchema = new Schema({
  name: String,
  brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
  desc: String,
  updated: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
})

let BrandSchema = new Schema({
  name: String
})

let CategorySchema = new Schema({
  name: String
})

let BatchSchema = new Schema({
  itemId: {type: Schema.Types.ObjectId, ref: 'Item'},
  count: Number, // 批次总量
  stock: Number, // 剩余库存
  price: Number,
  source: String,
  date: { type: Date, default: Date.now }
})

let BrandModel = mongoose.model('Brand', BrandSchema)
let CategoryModel = mongoose.model('Category', CategorySchema)
let ItemModel = mongoose.model('Item', ItemSchema)
let BatchModel = mongoose.model('Batch', BatchSchema)

/* 类别 */

export async function addCategory (name) {
  // TODO: 去重
  console.info(`add category by name : ${name}`)
  let cat = new CategoryModel({ name: name })
  let ret = await cat.save()
  console.log(`category save ret: ${ret}, id: ${ret._id}`)
  return ret
}

export async function getAllCategory () {
  let ret = await CategoryModel.find()
  console.log(`list all category : ${ret}`)
  return ret
}

export async function deleteCategory (categoryId) {
  let ret = await CategoryModel.remove({_id: categoryId})
  console.log(`delete category result : ${ret.ok}, updated: ${ret.n}`)
  return ret.ok && ret.n > 0
}

/* 品牌 */

export async function addBrand (name) {
  // TODO: 去重
  let brand = new BrandModel({ name: name })
  let ret = await brand.save()
  return ret
}

export async function deleteBrand (brandId) {
  let ret = await BrandModel.remove({_id: brandId})
  console.log(`delete brand result : ${ret.ok}, updated: ${ret.n}`)
  return ret
}

export async function getAllBrands () {
  let ret = await BrandModel.find()
  console.info(`list all brands : ${ret}`)
  return ret
}

/* 商品 */

export async function addItem (name, desc, brandId, categoryId) {
  let item = new ItemModel({
    name: name,
    desc: desc,
    brand: brandId,
    category: categoryId
  })
  let ret = await item.save()
  return ret
}

export async function deleteItem (itemId) {
  let ret = await ItemModel.remove({_id: itemId})
  console.log(`delete item result : ${ret.ok}, updated: ${ret.n}`)
  return ret
}

export async function getAllItems () {
  let result = await ItemModel.find().populate('brand').populate('category').lean()
  // 先试一下用聚合，如果性能差再改为添加字段count作为缓存
  let batch = await BrandModel.aggregate().group({_id: '$itemId', count: {'$sum': '$stock'}})
  result = result.map((item) => {
    let temp = batch.filter((b) => (b.itemId === item._id))
    let count = temp.length > 0 ? temp[0].count : 0
    item.count = count
    return item
  })
  console.log(result)
  return result
}

export async function addBatch (itemId, count, price, source) {
  let sourceValue = source || ''
  let batch = new BatchModel({
    itemId: itemId,
    count: count,
    stock: count,
    price: price,
    source: sourceValue
  })
  let ret = await batch.save()
  return ret
}

export async function getBatchs (itemId) {
  let result = await BrandModel.find({itemId: itemId})
  console.log(`list item's(${itemId}) batchs : ${result}`)
  return result
}
