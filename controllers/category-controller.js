import CategoriesService from '../services/category-service';
import categoriesService from '../services/category-service';
import subCategoryService from '../services/sub-category-service';

class CategoryController {
  async createCategory(req, res) {
    //카테고리 생성

    const { categoryName } = req.body;
    const checkCategory = await categoriesService.findCategory({
      categoryName,
    });
    // 하위 카테고리 명이 있을때 받아온 상위카테고리를 찾아서 하위 카테고리를 생성
    if (checkCategory) {
      return res.json({
        success: false,
        message: '이미 존재하는 카테고리 명입니다.',
      });
    }
    const category = await CategoriesService.createCategory({
      categoryName,
    });
    res.status(201).json({ success: true, data: category });
  }

  async getCategories(req, res) {
    const categories = await CategoriesService.getCategoryList();
    res.status(200).json(categories);
  }
  // 상위 카테고리 삭제
  async removeCategory(req, res) {
    const { id } = req.params;
    const deleteSubcategories = await subCategoryService.deleteMany({
      categoryId: id,
    });
    const result = await CategoriesService.removeCategory({ _id: id });
    res.status(201).json({ success: true, data: result, deleteSubcategories });
  }
  // 상위 카테고리 수정
  async modifyCategory(req, res) {
    const { id } = req.params;
    const { categoryName } = req.body;
    const checkCategory = await categoriesService.findCategory({
      categoryName,
    });
    // 하위 카테고리 명이 있을때 받아온 상위카테고리를 찾아서 하위 카테고리를 생성
    if (checkCategory) {
      return res.json({
        success: false,
        message: '이미 존재하는 카테고리 명입니다.',
      });
    }
    const result = await CategoriesService.modifyCategory(id, {
      categoryName,
    });
    res.status(201).json({ success: true, data: result });
  }
}

const categoryController = new CategoryController();
export default categoryController;
