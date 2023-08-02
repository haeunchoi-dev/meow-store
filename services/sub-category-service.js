import SubCategory from '../models/sub-category-model';

class SubCategoryService {
  async createCategory(id, subCategoryName) {
    const category = await SubCategory.create(id, subCategoryName);
    return category;
  }
  async findSubCategory(subCategory) {
    const result = await SubCategory.findOne(subCategory);
    return result;
  }
  async getSubCategoryList() {
    const result = await SubCategory.findAll();
    return result;
  }
  async findById(id) {
    const result = await SubCategory.findById(id);
    return result;
  }
  async findOne(id) {
    const result = await SubCategory.findOne(id);
    return result;
  }
  async find(id) {
    const result = await SubCategory.find(id);
    return result;
  }
  async deleteMany(id) {
    const result = await SubCategory.deleteMany(id);
    return result;
  }
  async deleteOne(id) {
    const result = await SubCategory.deleteOne(id);
    return result;
  }
  // async getCategoryList() {
  //   const categories = await Category.findAll();
  //   return categories;
  // }

  // async findCategory(newCategory) {
  //   const category = await Category.findOne({ categoryName: newCategory });
  //   return category;
  // }
  // async removeCategory(categoryName) {
  //   const result = await Category.deleteOne({ categoryName });
  //   return result;
  // }
}

const subCategoryService = new SubCategoryService();
export default subCategoryService;
