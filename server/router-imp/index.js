import dataHandle from './dataHandle'
const {
  handleAddItem,
  handleGetAllItems,
  handleAddCategory,
  handleGetCategorys,
  handleAddBrand,
  handleGetBrand,
  handleAddBatch,
  handleGetBatchs,
  handleDeleteCategory,
  handleDeleteBrand,
  handleDeleteItem
} = dataHandle

export default function initRouterHandler (router) {
  router.post('/category/add', handleAddCategory)
  router.post('/category/delete', handleDeleteCategory)
  router.get('/categorys', handleGetCategorys)
  router.post('/brand/add', handleAddBrand)
  router.post('/brand/delete', handleDeleteBrand)
  router.get('/brands', handleGetBrand)
  router.post('/item/add', handleAddItem)
  router.post('/item/delete', handleDeleteItem)
  router.get('/items', handleGetAllItems)
  router.post('/batch/add', handleAddBatch)
  router.get('/item/:itemId/batchs', handleGetBatchs)
}
