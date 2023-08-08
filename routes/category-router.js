import { Router } from 'express';
import { adminRequired, errorHandler } from '../middlewares';
import categoryController from '../controllers/category-controller';

const categoryRouter = Router();

const baseUrl = '/admin/category';

categoryRouter.post(
  `${baseUrl}`,
  adminRequired,
  errorHandler(categoryController.createCategory),
);
categoryRouter.get(
  '/admin/category',
  errorHandler(categoryController.getCategories),
);
categoryRouter.delete(
  `${baseUrl}/:id`,
  adminRequired,
  errorHandler(categoryController.removeCategory),
);
categoryRouter.put(
  `${baseUrl}/:id`,
  adminRequired,
  errorHandler(categoryController.modifyCategory),
);

export default categoryRouter;
