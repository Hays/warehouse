import mongoose, { Schema } from '../database'

let ItemSchema = new Schema({
    name: String,
    brand: Schema.Types.ObjectId,
    desc: String,
    updated: Date,
    category: Schema.Types.ObjectId
})

let BrandSchema = new Schema({
    name: String
})

let CategorySchema = new Schema({
    name: String
})

let BatchSchema = new Schema({
    itemId: Schema.Types.ObjectId,
    count: Number,                  // 批次总量
    stock: Number,                  // 剩余库存
    price: Number,
    source: String,
    date: Date
})

let ItemModel = mongoose.model('Item', ItemSchema)
let BrandModel = mongoose.model('Brand', BrandSchema)
let CategoryModel = mongoose.model('Category', CategorySchema)
let BatchModel = mongoose.model('Batch', BatchSchema)

export async function addCategory(name) {
    console.info(`add category by name : ${name}`)
    let cat = new CategoryModel({ name: name })
    let ret = await cat.save()
    return ret
}

export function addItem() {

}

export function addBatch() {

}