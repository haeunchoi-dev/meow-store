import SubCategoriesService from '../services/sub-category-service';
import categoriesService from '../services/category-service';

class SubCategoryController {
  // 하위 카테고리 생성
  async createSubCategory(req, res) {
    const { categoryId, subCategoryName } = req.body;
    const category = await SubCategoriesService.findSubCategory({
      subCategoryName,
    });
    if (category) {
      return res.json({
        success: false,
        message: '이미 존재하는 카테고리 명입니다.',
      });
    }
    const subCategory = await SubCategoriesService.createCategory({
      categoryId,
      subCategoryName,
    });
    res.status(201).json({ success: true, data: subCategory });
  }
  // 카테고리 전체 조회
  async getSubCategoryList(req, res) {
    //   const result = await SubCategoriesService.getSubCategoryList();
    const result = await categoriesService.getCategoryList();
    const categoriesWithSubcategories = result.map(async (category) => {
      const subCategories = await SubCategoriesService.find({
        categoryId: category._id,
      });
      return { ...category.toObject(), data: subCategories };
    });
    const processedResult = await Promise.all(categoriesWithSubcategories);
    res.status(201).json({ success: true, data: processedResult });
  }
  // 하위 카테고리 수정
  async modifySubCategory(req, res) {
    const { id } = req.params;
    const { subCategoryName } = req.body;
    const nameCheck = await SubCategoriesService.findSubCategory({
      subCategoryName,
    });
    if (nameCheck) {
      return res.json({
        success: false,
        message: '이미 존재하는 카테고리 명입니다.',
      });
    }
    const category = await SubCategoriesService.findById(id);
    category.subCategoryName = subCategoryName;
    const result = await category.save();
    res.status(201).json({ success: true, data: result });
  }
  // 하위 카테고리 삭제
  async removeSubCategory(req, res) {
    const { id } = req.params;
    const result = await SubCategoriesService.deleteOne({ _id: id });
    res.status(201).json({ success: true, data: result });
  }
}
const subCategoryController = new SubCategoryController();
export default subCategoryController;
