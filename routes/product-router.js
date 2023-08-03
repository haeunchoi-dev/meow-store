import { Router } from 'express';
import { adminRequired, errorHandler } from '../middlewares';
import { upload } from '../middlewares/multer';
import productController from '../controllers/product-controller';
const productRouter = Router();

productRouter.get('/product/:id', errorHandler(productController.getProduct));
productRouter.get('/products', errorHandler(productController.getProducts));

const adminBaseUrl = '/admin/product';
productRouter.post(
  `${adminBaseUrl}`,
  adminRequired,
  upload.single('file'),
  errorHandler(productController.createProduct),
);
productRouter.post(
  `${adminBaseUrl}/:id`,
  adminRequired,
  upload.single('file'),
  errorHandler(productController.editProduct),
);
productRouter.delete(
  `${adminBaseUrl}/:id`,
  adminRequired,
  errorHandler(productController.deleteProduct),
);
export default productRouter;
