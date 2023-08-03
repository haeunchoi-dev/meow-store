import { Router } from 'express';
import { adminRequired } from '../middlewares';
import { upload } from '../middlewares/multer';
import productController from '../controllers/product-controller';
const productRouter = Router();

productRouter.get('/product/:id', productController.getProduct);
productRouter.get('/products', productController.getProducts);

const adminBaseUrl = '/admin/product';
productRouter.post(
  `${adminBaseUrl}`,
  adminRequired,
  upload.single('file'),
  productController.createProduct,
);
productRouter.post(
  `${adminBaseUrl}/:id`,
  adminRequired,
  upload.single('file'),
  productController.editProduct,
);
productRouter.delete(
  `${adminBaseUrl}/:id`,
  adminRequired,
  productController.deleteProduct,
);
export default productRouter;
