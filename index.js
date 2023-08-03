import 'dotenv/config';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { generateSecretKey } from './jwt/secret-key';
import connectDB from './config/db';
import apiRouter from './routes';
import { getSwaggerOption } from './utils/swagger-option';

connectDB();

generateSecretKey();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/', express.static(path.join(__dirname, 'views/pages')));

//swagger 적용
const { swaggerUI, specs, setUpoption } = getSwaggerOption();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpoption));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`포트: ${PORT} 서버 가동 시작`);
});
