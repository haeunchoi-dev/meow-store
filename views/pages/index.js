addAllElements();

async function addAllElements() {
  document
    .querySelector('common-header')
    .shadowRoot.querySelector('header')
    .insertAdjacentHTML(
      'beforeend',
      `<nav class = "mainNav">
          </nav>`,
    );

  await getCategoryList();
}

async function getCategoryList() {
  const mainNav = document
    .querySelector('common-header')
    .shadowRoot.querySelector('.mainNav');

  const result = await fetch('/api/admin/subcategory');
  const data = await result.json();

  const categoryArr = data.data;

  const categoryElements = categoryArr.map(
    (categoryObj) =>
      `<li class="top-categorys" onclick="clickNav(this,'${
        categoryObj._id
      }')" id="${categoryObj._id}">
        ${categoryObj.categoryName}
        <div class="row-categorys">
          ${
            categoryObj.data.length > 0
              ? categoryObj.data
                  .map((subCategory) => {
                    return `<div class="row-category" onclick="clickSubNav(event,this,'${subCategory._id}')" id="${subCategory._id}" >${subCategory.subCategoryName}</div>`;
                  })
                  .join('')
              : ''
          }
        </div>
      </li>`,
  );
  mainNav.innerHTML = `<ul><li onclick="clickNav(this,'')" >전체</li>${categoryElements.join(
    '',
  )}</ul>`;

  mainNav.querySelector('li').click();
}

function clickNav(o, categoryId) {
  const mainNav = document
    .querySelector('common-header')
    .shadowRoot.querySelector('.mainNav');
  const lis = mainNav.querySelectorAll('li');
  lis.forEach((li) => {
    li.classList.remove('active');
    li.querySelector('.row-categorys')?.classList.remove('active');
    li.querySelectorAll('.row-category')?.forEach((subCategory) => {
      subCategory.classList.remove('active');
    });
  });
  o.classList.add('active');
  o.querySelector('.row-categorys')?.classList.add('active');

  //main 요소에 list뿌려주기
  getProductList(categoryId);
}

function clickSubNav(e, o, subcategoryId) {
  const mainNav = document
    .querySelector('common-header')
    .shadowRoot.querySelector('.mainNav');
  // 이벤트 객체를 받아옴
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }

  mainNav.querySelectorAll('.row-category')?.forEach((subCategory) => {
    subCategory.classList.remove('active');
  });
  o.classList.add('active');

  const categoryId = o.closest('li').getAttribute('id');
  getProductList(categoryId, subcategoryId);
}

async function getProductList(categoryId, subcategoryId = '') {
  let endpoint = '/api/products';
  let querystring =
    categoryId === ''
      ? ''
      : `?categoryId=${categoryId}${
          subcategoryId === '' ? '' : `&subcategoryId=${subcategoryId}`
        }`;
  const result = await fetch(`${endpoint}${querystring}`);
  const jsonData = await result.json();

  //전체 아이템 표시
  const itemElements = jsonData.map(
    (item) => `
    <div class="item" id="${item._id}" onclick="redirectToProductDetails('${
      item._id
    }')">
      <div class="image-box">
        <img src="${item.repImgUrl}" alt="${item.name}" />
      </div>
      <div class="item-bottom">
        <h3 class="title">${item.name}</h3>
        <span>${item.summary}</span>
        <span class="price">${Number(item.price).toLocaleString()}원</span>
        
      </div>
    </div>
  `,
  );

  const itemBoxs = document.querySelector('.item-box');
  itemBoxs.innerHTML = itemElements.join('');
}

function redirectToProductDetails(itemId) {
  location.href = `/product-details?id=${itemId}`;
}
