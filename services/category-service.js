import Category from '../models/category-model';

class CategoriesService {
  async getCategoryList() {
    const categories = await Category.findAll();
    return categories;
  }

  async createCategory(categoryName) {
    const category = await Category.create(categoryName);
    return category;
  }
  async findCategory(categoryName) {
    const category = await Category.findOne(categoryName);
    return category;
  }
  async removeCategory(id) {
    const result = await Category.deleteOne(id);
    return result;
  }

  async modifyCategory(id, categoryName) {
    const result = await Category.updateId(id, categoryName);
    return result;
  }
  async findById(id) {
    const result = await Category.findById(id);
    return result;
  }
}

const categoriesService = new CategoriesService();
export default categoriesService;
