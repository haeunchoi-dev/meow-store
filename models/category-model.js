import mongoose from 'mongoose';
import CategorySchema from './schemas/category';

const Category = mongoose.model('Category', CategorySchema);

class CategoryModel {
  async findOne(categoryName) {
    const category = await Category.findOne(categoryName);
    return category;
  }
  async findAll() {
    const categories = await Category.find();
    return categories;
  }

  async create(categoryName) {
    const result = await Category.create(categoryName);
    return result;
  }
  async deleteOne(id) {
    const result = await Category.deleteOne(id);
    return result;
  }
  async updateId(id, categoryName) {
    const filter = { _id: id };
    const option = { returnOriginal: false };
    const result = await Category.findOneAndUpdate(
      filter,
      categoryName,
      option,
    );
    return result;
  }

  async findById(id) {
    const result = await Category.findById(id);
    return result;
  }

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

const categoryModel = new CategoryModel();

export default categoryModel;
