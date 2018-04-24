import dataHandle from './dataHandle'
const {
  addItem,
  handleAddCategory,
  handleGetCategorys,
  handleAddBrand,
  handleGetBrand
} = dataHandle

export default function initRouterHandler(router) {
  router.post('/category/add', handleAddCategory)
  router.get('/categorys', handleGetCategorys)
  router.post('/brand/add', handleAddBrand)
  router.get('/brands', handleGetBrand)
}
