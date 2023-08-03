import { Router } from 'express';
import { adminRequired, errorHandler } from '../middlewares';
import subCategoryController from '../controllers/sub-category-controller';

const subCategoryRouter = Router();

const baseUrl = '/admin/subcategory';

subCategoryRouter.post(
  `${baseUrl}`,
  adminRequired,
  errorHandler(subCategoryController.createSubCategory),
);
subCategoryRouter.get(
  `${baseUrl}`,
  errorHandler(subCategoryController.getSubCategoryList),
);
subCategoryRouter.delete(
  `${baseUrl}/:id`,
  adminRequired,
  errorHandler(subCategoryController.removeSubCategory),
);
subCategoryRouter.put(
  `${baseUrl}/:id`,
  adminRequired,
  errorHandler(subCategoryController.modifySubCategory),
);

export default subCategoryRouter;
