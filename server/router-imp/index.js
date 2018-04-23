import dataHandle from './dataHandle'

const { addItem, handleAddCategory } = dataHandle

export default function initRouterHandler(router) {
  router.post('/category/add', handleAddCategory)
}
