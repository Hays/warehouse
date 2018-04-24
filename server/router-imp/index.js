import dataHandle from './dataHandle'
const {
  addItem,
  handleAddCategory,
  handleGetCategorys
} = dataHandle

export default function initRouterHandler(router) {
  router.post('/category/add', handleAddCategory)
  router.get('/categorys', handleGetCategorys)
}
