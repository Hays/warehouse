

let SERVER_URL = 'http://192.168.1.6:8089'

export const GET_CATEGORYS_API = combineAPI('/categorys')
export const ADD_CATEGORY_API = combineAPI('/category/add')

function combineAPI(api) {
  return SERVER_URL + api
}