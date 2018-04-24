import axios from 'axios'
import { 
  GET_CATEGORYS_API,
  ADD_CATEGORY_API
} from './constants'

export function getCategorys() {
  return axios.get(GET_CATEGORYS_API).then(response => {
    let data = response.data
    return data
  })
}

export function addCategory(name) {
  return axios.post(ADD_CATEGORY_API, {name: name}).then((response) => {
    if (response.status === 200) {
      return 0
    } else {
      return response.status
    }
  })
}