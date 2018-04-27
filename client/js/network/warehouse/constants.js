

let SERVER_URL = 'http://192.168.1.6:8089'

export const GET_CATEGORYS_API = combineAPI('/categorys')
export const ADD_CATEGORY_API = combineAPI('/category/add')
export const GET_BRANDS_API = combineAPI('/brands')
export const ADD_BRAND_API = combineAPI('/brand/add')
export const GET_ITEMS_API = combineAPI('/items')
export const ADD_ITEM_API = combineAPI('/item/add')

function combineAPI(api) {
  return SERVER_URL + api
}