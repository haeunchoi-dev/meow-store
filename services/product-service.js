import Product from '../models/product-model';

class ProductsService {
  async getProductList(option) {
    //TODO:category 필터 추가
    const products = await Product.findAll(option);
    return products;
  }

  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('상품을 찾을 수 없습니다.');
    }
    return product;
  }

  async createProduct(newProduct) {
    const product = await Product.create(newProduct);
    return product;
  }

  async editProduct(id, update) {
    const updatedProduct = await Product.updateById(id, update);
    return updatedProduct;
  }

  async deleteProduct(id) {
    const result = await Product.deleteProduct(id);
    return result;
  }
}

const productsService = new ProductsService();
export default productsService;
