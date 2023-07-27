import mongoose from 'mongoose';
import { moment } from '../utils/moment';
import productSchema from './schemas/product';

const Product = mongoose.model('products', productSchema);

class ProductModel {
  async findAll(option = {}) {
    const products = await Product.find({ ...option, deleteYn: 'N' })
      .populate('categoryId')
      .populate('subcategoryId');
    return products;
  }

  async findById(id) {
    const product = await Product.findOne({ _id: id })
      .populate('categoryId')
      .populate('subcategoryId');
    return product;
  }

  async create(product) {
    const newProduct = await Product.create(product);
    return newProduct;
  }

  async updateById(id, update) {
    const filter = { _id: id };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedProduct;
  }

  async deleteProduct(id) {
    const filter = { _id: id };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      { deleteYn: 'Y', deleteDate: moment().format('YYYY-MM-DD HH:mm:ss') },
      option,
    );
    return updatedProduct;
  }
}

const productModel = new ProductModel();
export default productModel;
