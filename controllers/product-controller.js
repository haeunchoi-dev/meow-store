import ProductService from '../services/product-service';

class ProductController {
  async getProducts(req, res) {
    try {
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
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }

  async getProduct(req, res) {
    try {
      const { id } = req.params;

      const products = await ProductService.getProductById(id);
      res.status(200).json(products);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }

  async createProduct(req, res) {
    try {
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
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }

  async editProduct(req, res, next) {
    try {
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
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ProductService.deleteProduct(id);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
}
const productController = new ProductController();
export default productController;
