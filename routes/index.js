import { Router } from 'express';

import productRouter from './product-router';
import orderRouter from './order-router';
import categoryRouter from './category-router';
import categorySubRouter from './category-sub-router';
import userRouter from './user-router';

const apiRouter = Router();

apiRouter.use(productRouter);
apiRouter.use(orderRouter);
apiRouter.use(categoryRouter);
apiRouter.use(categorySubRouter);
apiRouter.use(userRouter);

export default apiRouter;
