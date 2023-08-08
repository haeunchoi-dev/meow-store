import Cart from '/views/store/cart.js';
import { getCookie } from '/views/utils/index.js';

let savedCartData = Cart.selectAll();
const cartList = document.querySelector('.cart_list');
let priceSum = 0;
const priceSumElement = document.querySelector('#price_sum');

// savedCartData의 상품목록을 그려주는 반복문
for (let i = 0; i < savedCartData.length; ++i) {
  let data = savedCartData[i];
  const content = `
    <div class="product_wrap" product_id="${data._id}">
      <div class="thumbnail_wrap">
        <img src="${data.repImgUrl}" class="product_thumbnail" alt="thumbnail"/>
      </div>
      <div class="product_info">
        <div class="product_name">
          <span>${data.name}</span>
        </div>
        <div class="qty_wrap">
          <button class="qty_down button is-light" name="qty_down" >-</button>
          <span class="product_qty" name="product_qty" >${data.qty}</span>
          <button class="qty_up button is-light" name="qty_up" >+</button>
        </div>
        <span class="product_price" price="${
          data.price
        }" >${data.price.toLocaleString()} 원</span>
        <button class="delete_each button is-light" name="delete_each">삭제</button>
      </div>
    </div>
  `;

  const newLi = document.createElement('li');
  newLi.innerHTML = content;
  cartList.appendChild(newLi);
  priceSum += data.price * data.qty;
}
priceSumElement.innerText = `${priceSum.toLocaleString()} 원`;

//event
cartList.addEventListener('click', (e) => {
  const target = e.target;
  const name = target.getAttribute('name');
  if (name === 'qty_down') {
    qtyDown(target);
  } else if (name === 'qty_up') {
    qtyUp(target);
  } else if (name === 'delete_each') {
    deleteEach(target);
  }
});

const deleteAllBtn = document.querySelector('.delete_all');
const orderBtn = document.querySelector('#order_btn');

function qtyUp(target) {
  const qtyElement = target.closest('div').querySelector('[name=product_qty]');
  const productPrice = target
    .closest('.product_wrap')
    .querySelector('.product_price')
    .getAttribute('price');

  const id = target.closest('.product_wrap').getAttribute('product_id');
  const qty = Number(qtyElement.innerText);
  if (qty === 9) {
    alert('최대 구매 수량은 9개입니다.');
  } else {
    qtyElement.innerText = qty + 1;
    Cart.update({
      id,
      qty: qty + 1,
    });
    priceSum += Number(productPrice);
    priceSumElement.innerText = `${priceSum.toLocaleString()} 원`;
  }
}

function qtyDown(target) {
  const qtyElement = target.closest('div').querySelector('[name=product_qty]');
  const productPrice = target
    .closest('.product_wrap')
    .querySelector('.product_price')
    .getAttribute('price');
  const id = target.closest('.product_wrap').getAttribute('product_id');
  const qty = Number(qtyElement.innerText);
  if (qty > 1) {
    qtyElement.innerText = qty - 1;
    Cart.update({
      id,
      qty: qty - 1,
    });
    priceSum -= Number(productPrice);
    priceSumElement.innerText = `${priceSum.toLocaleString()} 원`;
  }
}

function deleteEach(target) {
  const id = target.closest('.product_wrap').getAttribute('product_id');
  const li = target.closest('.product_wrap').parentElement;
  const productPrice = target
    .closest('.product_wrap')
    .querySelector('.product_price')
    .getAttribute('price');
  li.remove();

  const price = Number(productPrice);
  const qty = target.closest('.product_wrap').querySelector('.product_qty');

  priceSum -= price * Number(qty.innerText);
  priceSumElement.innerText = `${priceSum.toLocaleString()} 원`;

  Cart.remove({ _id: id }, (items) => {
    if (items.length === 0) {
      priceSumElement.innerText = '0 원';
      Cart.removeAll();
    }
  });
}

function deleteAll() {
  const userConfirm = confirm('장바구니를 비우시겠습니까?');
  if (userConfirm) {
    Cart.removeAll();
    cartList.innerHTML = '';
    priceSumElement.innerText = '0 원';
  }
}
deleteAllBtn.addEventListener('click', deleteAll);

orderBtn.addEventListener('click', () => {
  if (Cart.count({}) === 0) {
    alert('장바구니에 상품이 없습니다.');
    return;
  }
  if (!getCookie('loginToken')) {
    alert('로그인 후 주문 가능합니다.');
    return;
  }
  location.href = '/order-create/';
});
