const Product = require('../models/product-model');

class ProductsService {
  async getProductList() {
    const products = await Product.findAll();
    return products;
  }

  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: '상품을 찾을 수 없습니다.' });
    }
    return product;
  }

  async createProduct(newProduct) {
    const product = await Product.create(newProduct);
    return product;
  }
}

const productsService = new ProductsService();
module.exports = productsService;