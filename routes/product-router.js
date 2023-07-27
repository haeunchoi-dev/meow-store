import { Router } from 'express';
import productController from '../controllers/product-controller';
const productRouter = Router();

productRouter.get('/:id', productController.getProduct);

export { productRouter };
