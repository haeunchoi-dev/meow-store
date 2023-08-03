import { Router } from 'express';
import { adminRequired } from '../middlewares';
import categoryController from '../controllers/category-controller';
const categoryRouter = Router();

const baseUrl = '/admin/category';

categoryRouter.post(
  `${baseUrl}`,
  adminRequired,
  categoryController.createCategory,
);
categoryRouter.get('/admin/category', categoryController.getCategories);
categoryRouter.delete(
  `${baseUrl}/:id`,
  adminRequired,
  categoryController.removeCategory,
);
categoryRouter.put(
  `${baseUrl}/:id`,
  adminRequired,
  categoryController.modifyCategory,
);

export default categoryRouter;
