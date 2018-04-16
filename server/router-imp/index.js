import { homeHandle } from './htmlHandler'
import dataHandle from './dataHandle'
import { addCategory } from '../model/warehouse-item'

const { addItem } = dataHandle

export default function initRouterHandler(router) {
    router.get('/', homeHandle)
}
