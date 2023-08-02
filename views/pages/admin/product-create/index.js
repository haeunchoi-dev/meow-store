import { blockIfNotAdmin, isNull } from '/utils/index.js';
blockIfNotAdmin();
import * as API from '/api/index.js';
import '/components/CategoryModal.js';

const callbackCategoryModal = function (result) {
  console.log(result);
  const categoryName = document.getElementById('categoryName');
  const categoryId = document.getElementById('categoryId');
  const subcategoryId = document.getElementById('subcategoryId');

  categoryName.innerText = result.name;
  categoryId.value = result.categoryId;
  subcategoryId.value = result.subcategoryId ? result.subcategoryId : '';
};
const CategoryModal = document.createElement('category-modal');
CategoryModal.modalCallback = callbackCategoryModal;
document.getElementById('categoryModal').appendChild(CategoryModal);

const fileInput = document.getElementById('fileInput'); // 파일을 선택하는 input 요소
const uploadButton = document.getElementById('uploadButton'); // 업로드 버튼

const productName = document.getElementById('product_name');
const categoryId = document.getElementById('categoryId');
const subcategoryId = document.getElementById('subcategoryId');
const stock = document.getElementById('stock');
const price = document.getElementById('price');
const summary = document.getElementById('summary');
const description = document.getElementById('description');

uploadButton.addEventListener('click', createProduct);

function checkValidation() {
  if (isNull(categoryId.value)) {
    alert('카테고리를 선택해 주세요');
    return false;
  }
  if (isNull(productName.value)) {
    productName.focus();
    alert('상품명을 입력해 주세요.');
    return false;
  }
  if (isNull(price.value)) {
    price.focus();
    alert('판매가를 입력해 주세요.');
    return false;
  }
  if (isNaN(price.value)) {
    price.focus();
    alert('숫자를 입력해 주세요.');
    return false;
  }
  if (isNaN(stock.value)) {
    stock.focus();
    alert('숫자를 입력해 주세요.');
    return false;
  }
  if (isNull(summary.value)) {
    summary.focus();
    alert('상품 요약 설명을 입력해 주세요.');
    return false;
  }
  if (isNull(description.value)) {
    description.focus();
    alert('상품 상세 설명을 입력해 주세요.');
    return false;
  }

  return true;
}
async function createProduct() {
  if (!checkValidation()) return;
  const formData = new FormData();
  formData.enctype = 'multipart/form-data';
  formData.append('categoryId', categoryId.value);
  if (subcategoryId.value !== '') {
    formData.append('subcategoryId', subcategoryId.value);
  }
  formData.append('name', productName.value);
  formData.append('price', price.value);
  formData.append('stock', stock.value);
  formData.append('summary', summary.value);
  formData.append('description', description.value);

  formData.append('file', fileInput.files[0]); // 파일을 FormData에 추가
  console.log(formData);

  //validation 추가할것

  const result = await API.post('/api/admin/product', formData, true, true);

  console.log(result);
  alert('제품등록이 완료되었습니다.');
  location.href = '/admin/product';
}

fileInput.onchange = () => {
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#fileName');
    fileName.textContent = fileInput.files[0].name;
  }
};
