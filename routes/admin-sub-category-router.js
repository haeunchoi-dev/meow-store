import { Router } from 'express';
import { adminRequired } from '../middlewares';
import subCategoryController from '../controllers/sub-category-controller';
const adminSubCategoryRouter = Router();

adminSubCategoryRouter.post(
  '/',
  adminRequired,
  subCategoryController.createSubCategory,
);
adminSubCategoryRouter.get('/', subCategoryController.getSubCategoryList);
adminSubCategoryRouter.delete(
  '/:id',
  adminRequired,
  subCategoryController.removeSubCategory,
);
adminSubCategoryRouter.put(
  '/:id',
  adminRequired,
  subCategoryController.modifySubCategory,
);

export { adminSubCategoryRouter };
