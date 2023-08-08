import ProductService from '../services/product-service';

class ProductController {
  async getProducts(req, res) {
    const { categoryId, subcategoryId } = req.query;

    let option = {};
    if (categoryId) {
      option.categoryId = categoryId;
    }
    if (subcategoryId) {
      option.subcategoryId = subcategoryId;
    }

    const products = await ProductService.getProductList(option);
    res.status(200).json(products);
  }

  async getProduct(req, res) {
    const { id } = req.params;

    const products = await ProductService.getProductById(id);
    res.status(200).json(products);
  }

  async createProduct(req, res) {
    let repImgUrl = '/views/assets/not-image.png';
    if (req.file) {
      repImgUrl = '/views/uploads/' + req.file?.filename;
    }

    const product = await ProductService.createProduct({
      ...req.body,
      userId: req.currentUserId,
      repImgUrl,
    });

    res.status(201).json({ success: true, data: product });
  }

  async editProduct(req, res) {
    console.log(req.body);
    const { id } = req.params;
    let repImgUrl = req.body.prevImgUrl
      ? req.body.prevImgUrl
      : '/views/assets/not-image.png';
    if (req.file) {
      repImgUrl = '/views/uploads/' + req.file?.filename;
    }
    if (
      req.body.subcategoryId === '' ||
      req.body.subcategoryId == 'undefined'
    ) {
      req.body.subcategoryId = null;
    }
    const updatedProduct = await ProductService.editProduct(id, {
      ...req.body,
      userId: req.currentUserId,
      repImgUrl,
    });
    res.status(200).json(updatedProduct);
  }
  async deleteProduct(req, res) {
    const { id } = req.params;
    const result = await ProductService.deleteProduct(id);
    res.status(200).json(result);
  }
}
const productController = new ProductController();
export default productController;
