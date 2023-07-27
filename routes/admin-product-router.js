import { Router } from 'express';
import { adminRequired } from '../middlewares';
import { upload } from '../middlewares/multer';
import productController from '../controllers/product-controller';
const adminProductRouter = Router();

adminProductRouter.post(
  '/',
  adminRequired,
  upload.single('file'),
  productController.createProduct,
);
adminProductRouter.post(
  '/:id',
  adminRequired,
  upload.single('file'),
  productController.editProduct,
);
adminProductRouter.delete(
  '/:id',
  adminRequired,
  productController.deleteProduct,
);

export { adminProductRouter };
