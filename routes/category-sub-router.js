import { Router } from 'express';
import { adminRequired } from '../middlewares';
import subCategoryController from '../controllers/sub-category-controller';
const subCategoryRouter = Router();

const baseUrl = '/admin/subcategory';

subCategoryRouter.post(
  `${baseUrl}`,
  adminRequired,
  subCategoryController.createSubCategory,
);
subCategoryRouter.get(`${baseUrl}`, subCategoryController.getSubCategoryList);
subCategoryRouter.delete(
  `${baseUrl}/:id`,
  adminRequired,
  subCategoryController.removeSubCategory,
);
subCategoryRouter.put(
  `${baseUrl}/:id`,
  adminRequired,
  subCategoryController.modifySubCategory,
);

export default subCategoryRouter;
