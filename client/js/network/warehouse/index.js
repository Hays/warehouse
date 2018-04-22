import axios from 'axios'
import { GET_CATEGORYS_API } from './constants'

export function getCategorys() {
  return axios.get(GET_CATEGORYS_API).then(response => {
    console.log(response)
  })
}