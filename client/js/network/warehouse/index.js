import axios from 'axios'
import {
  GET_CATEGORYS_API,
  ADD_CATEGORY_API,
  GET_BRANDS_API,
  ADD_BRAND_API,
  GET_ITEMS_API,
  ADD_ITEM_API,
  batchsUrl,
  ADD_BATCH_API,
  DELETE_CATEGORY_API,
  DELETE_BRAND_API,
  DELETE_ITEM_API,
  DELETE_BATCH_API,
  updateBatchUrl
} from './constants'

export function getCategorys () {
  return axios.get(GET_CATEGORYS_API).then(response => {
    let data = response.data
    return data
  })
}

export function addCategory (name) {
  return axios.post(ADD_CATEGORY_API, {name: name}).then((response) => {
    if (response.status === 200) {
      return 0
    } else {
      return response.status
    }
  })
}

export function deleteCategory (catId) {
  return axios.post(DELETE_CATEGORY_API, {categoryId: catId}).then((response) => {
    if (response.status === 200) {
      return 0
    } else {
      return response.status
    }
  })
}

export function getBrands () {
  return axios.get(GET_BRANDS_API).then(response => {
    let data = response.data
    return data
  })
}

export function addBrand (name) {
  return axios.post(ADD_BRAND_API, {name: name}).then((response) => {
    if (response.status === 200) {
      return 0
    } else {
      return response.status
    }
  })
}

export function deleteBrand (brandId) {
  return axios.post(DELETE_BRAND_API, {brandId: brandId}).then((response) => {
    if (response.status === 200) {
      return 0
    } else {
      return response.status
    }
  })
}

export function getItems () {
  return axios.get(GET_ITEMS_API).then(response => {
    let data = response.data
    return data
  })
}

export function addItem (name, brandId, catId, desc) {
  return axios.post(ADD_ITEM_API, {name: name, brandId: brandId, categoryId: catId, desc: desc}).then((response) => {
    if (response.status === 200) {
      return 0
    } else {
      return response.status
    }
  })
}

export function deleteItem (itemId) {
  return axios.post(DELETE_ITEM_API, {itemId: itemId}).then((response) => {
    if (response.status === 200) {
      return 0
    } else {
      return response.status
    }
  })
}

export function getBatches (itemId) {
  return axios.get(batchsUrl(itemId)).then(response => {
    let data = response.data
    return data
  })
}

export function addBatch (itemId, count, price, source) {
  return axios.post(ADD_BATCH_API, {itemId: itemId, count: count, price: price, source: source}).then((response) => {
    if (response.status === 200) {
      return 0
    } else {
      return response.status
    }
  })
}

export function deleteBatch (batchId) {
  return axios.post(DELETE_BATCH_API, {batchId: batchId}).then((response) => {
    if (response.status === 200) {
      return 0
    } else {
      return response.status
    }
  })
}

export function updateBatch (batchId, newStock) {
  return axios.post(updateBatchUrl(batchId), {stock: newStock}).then(response => {
    if (response.status === 200) {
      return 0
    } else {
      return response.status
    }
  })
}