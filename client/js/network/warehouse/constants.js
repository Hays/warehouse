let SERVER_URL = 'http://127.0.0.1:8089'
export const GET_CATEGORYS_API = combineAPI('/categorys')
export const ADD_CATEGORY_API = combineAPI('/category/add')
export const DELETE_CATEGORY_API = combineAPI('/category/delete')
export const GET_BRANDS_API = combineAPI('/brands')
export const ADD_BRAND_API = combineAPI('/brand/add')
export const DELETE_BRAND_API = combineAPI('/brand/delete')
export const GET_ITEMS_API = combineAPI('/items')
export const ADD_ITEM_API = combineAPI('/item/add')
export const DELETE_ITEM_API = combineAPI('/item/delete')
export const ADD_BATCH_API = combineAPI('/batch/add')
export const DELETE_BATCH_API = combineAPI('/batch/delete')

function combineAPI (api) {
  return SERVER_URL + api
}

export function batchsUrl (itemId) {
  return combineAPI(`/item/${itemId}/batchs`)
}

export function updateBatchUrl (batchId) {
  return combineAPI(`/batch/${batchId}/update`)
}
