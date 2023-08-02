import { Router } from 'express';
import { adminRequired } from '../middlewares';
import categoryController from '../controllers/category-controller';
const adminCategoryRouter = Router();

adminCategoryRouter.post('/', adminRequired, categoryController.createCategory);
adminCategoryRouter.get('/', categoryController.getCategories);
adminCategoryRouter.delete(
  '/:id',
  adminRequired,
  categoryController.removeCategory,
);
adminCategoryRouter.put(
  '/:id',
  adminRequired,
  categoryController.modifyCategory,
);
// adminCategoryRouter.patch('/', categoryController.deleteLowCategory);

export { adminCategoryRouter };
