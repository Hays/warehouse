import axios from 'axios'
import {
  GET_CATEGORYS_API,
  ADD_CATEGORY_API,
  GET_BRANDS_API,
  ADD_BRAND_API,
  GET_ITEMS_API,
  ADD_ITEM_API,
  batchsUrl,
  ADD_BATCH_API
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
