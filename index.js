import 'dotenv/config';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { generateSecretKey } from './jwt/secret-key';
import connectDB from './config/db';
import {
  memberOrderRouter,
  memberOrdersRouter,
  adminProductRouter,
  adminCategoryRouter,
  adminSubCategoryRouter,
  productRouter,
  productsRouter,
  adminOrderRouter,
  adminOrdersRouter,
  userRouter,
} from './routes';
import ApiDcos from './docs/index';

connectDB();

generateSecretKey();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', productsRouter);
app.use('/api/product', productRouter);
app.use('/api/member/order', memberOrderRouter);
app.use('/api/member/orders', memberOrdersRouter);
app.use('/api/admin/product', adminProductRouter);
app.use('/api/admin/category', adminCategoryRouter);
app.use('/api/admin/subcategory', adminSubCategoryRouter);
app.use('/api/admin/order', adminOrderRouter);
app.use('/api/admin/orders', adminOrdersRouter);
app.use('/api/user', userRouter);

app.use('/assets', express.static(path.join(__dirname, 'views/assets')));
app.use(
  '/components',
  express.static(path.join(__dirname, 'views/components')),
);
app.use('/utils', express.static(path.join(__dirname, 'views/utils')));
app.use('/common', express.static(path.join(__dirname, 'views/common')));
app.use('/uploads', express.static(path.join(__dirname, 'views/uploads')));
app.use('/api', express.static(path.join(__dirname, 'views/api')));
app.use('/', express.static(path.join(__dirname, 'views/pages')));

//swagger 적용
function getSwaggerOption() {
  const apiDocs = new ApiDcos();
  apiDocs.init();

  return apiDocs.getSwaggerOption();
}
const { swaggerUI, specs, setUpoption } = getSwaggerOption();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpoption));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`포트: ${PORT} 서버 가동 시작`);
});
