import Cart from '/views/store/cart.js';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const infoBox = document.querySelector('#info_box');
let productData = {};

async function getProductData(id) {
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    productData = await response.json();
    productData.qty = 1;

    let subCategory = '';
    if (productData.subcategoryId)
      subCategory = ` > ${productData.subcategoryId.subCategoryName}`;
    infoBox.innerHTML = `
      <p class="product_category">${
        productData.categoryId.categoryName
      }${subCategory}</p>
      <p class="product_name title is-3">${productData.name}</p>
      <p class="line"></p>
      <p class="product_summary">${productData.summary}</p>
      <p class="product_description">${productData.description}</p>
      <p class="line"></p>
      <p class="product_price">${productData.price.toLocaleString()} 원</p>
      <div class="addToCart">
        <button id="order_button" class="button is-warning">구매하기</button>
        <button id="cart_button" class="button is-warning">장바구니에 추가</button>
      </div>
    `;

    const thumbnail = document.querySelector('#product_thumbnail');
    thumbnail.src = `${productData.repImgUrl}`;

    document.querySelector('#cart_button').addEventListener('click', addToCart);
    document
      .querySelector('#order_button')
      .addEventListener('click', addToCart);
  } catch (err) {
    console.log(err);
  }
}

getProductData(id);

function addToCart() {
  if (Cart.count({}) === 0) {
    Cart.insert(productData, () => {
      alert(`'${productData.name}'이(가) 장바구니에 추가되었습니다.`);
    });

    return;
  }
  const findData = Cart.findById(productData._id);
  console.log(findData);

  if (findData) {
    const userConfirm = confirm(
      '이미 장바구니에 담겨진 상품입니다. 1개 더 추가하시겠습니까?',
    );
    if (userConfirm) {
      Cart.update({
        id: productData._id,
        qty: findData.qty < 9 ? findData.qty + 1 : findData.qty,
      });
    }
    return;
  }
  // 이 상품이 장바구니에 담겨있지 않다면 추가
  Cart.insert(productData, () => {
    alert(`'${productData.name}'이(가) 장바구니에 추가되었습니다.`);
  });
}
