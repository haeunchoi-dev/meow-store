import mongoose from 'mongoose';
import SubCategorySchema from './schemas/subcategory';
const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

class SubCategoryModel {
  async findOne(subcategory) {
    const category = await SubCategory.findOne(subcategory);
    return category;
  }

  async findAll() {
    const categories = await SubCategory.find();
    return categories;
  }

  async create(id, subCategoryName) {
    const result = await SubCategory.create(id, subCategoryName);
    return result;
  }
  async findById(id) {
    const result = await SubCategory.findById(id);
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
  // async findOne(id) {}

  // async updateOne(newCategory) {
  //   const category = await Category.updateOne(
  //     { categoryName: newCategory.categoryName },
  //     { $push: { lowCategoryName: newCategory.lowCategoryName } },
  //   );
  //   return category;
  // }
  // async deleteOne(categoryName) {
  //   const category = await Category.deleteOne(categoryName);
  //   return category;
  // }
}

const subCategoryModel = new SubCategoryModel();

export default subCategoryModel;
