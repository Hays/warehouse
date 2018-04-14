import { homeHandle } from './htmlHandler'
import dataHandle from './dataHandle'

const { addItem } = dataHandle

export default function initRouterHandler(router) {
    router.get('/', homeHandle)
}
