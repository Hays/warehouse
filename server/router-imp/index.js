import dataHandle from './dataHandle'
const {
  handleAddItem,
  handleGetAllItems,
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
  router.post('/item/add', handleAddItem)
  router.get('/items', handleGetAllItems)
}
