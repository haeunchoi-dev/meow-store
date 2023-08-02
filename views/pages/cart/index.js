let savedCartData = JSON.parse(localStorage.getItem('meowStoreCart')) || [];
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
          <button class="qty_down button is-light" onclick="qtyDown(event)">-</button>
          <span class="product_qty" name="product_qty" >${data.qty}</span>
          <button class="qty_up button is-light" onclick="qtyUp(event)">+</button>
        </div>
        <span class="product_price">${data.price.toLocaleString()} 원</span>
        <button class="delete_each button is-light" onclick="deleteEach(event)">삭제</button>
      </div>
    </div>
  `;

  const newLi = document.createElement('li');
  newLi.innerHTML = content;
  cartList.appendChild(newLi);
  priceSum += data.price * data.qty;
}
priceSumElement.innerText = `${priceSum.toLocaleString()} 원`;

const qtyUpBtns = document.querySelectorAll('.qty_up');
const qtyDownBtns = document.querySelectorAll('.qty_down');
const qtyElements = document.querySelectorAll('.product_qty');
const deleteEachBtns = document.querySelectorAll('.delete_each');
const deleteAllBtn = document.querySelector('.delete_all');
const orderBtn = document.querySelector('#order_btn');

function qtyUp(event) {
  const qtyElement = event.target
    .closest('div')
    .querySelector('[name=product_qty]');
  const id = event.target.closest('.product_wrap').getAttribute('product_id');

  if (qtyElement.innerText === '9') {
    alert('최대 구매 수량은 9개입니다.');
  } else {
    qtyElement.innerText = Number(qtyElement.innerText) + 1;
    savedCartData = savedCartData.map((o) => {
      if (o._id === id) {
        o.qty += 1;
        priceSum += o.price;
        priceSumElement.innerText = `${priceSum.toLocaleString()} 원`;
      }
      return o;
    });
    localStorage.setItem('meowStoreCart', JSON.stringify(savedCartData));
  }
}

function qtyDown(event) {
  const qtyElement = event.target
    .closest('div')
    .querySelector('[name=product_qty]');
  const id = event.target.closest('.product_wrap').getAttribute('product_id');

  if (Number(qtyElement.innerText) > 1) {
    qtyElement.innerText = Number(qtyElement.innerText) - 1;
    savedCartData = savedCartData.map((o) => {
      if (o._id === id) {
        o.qty -= 1;
        priceSum -= o.price;
        priceSumElement.innerText = `${priceSum.toLocaleString()} 원`;
      }
      return o;
    });
    localStorage.setItem('meowStoreCart', JSON.stringify(savedCartData));
  }
}

function deleteEach(event) {
  const id = event.target.closest('.product_wrap').getAttribute('product_id');
  const li = event.target.closest('.product_wrap').parentElement;
  li.remove();

  const price = savedCartData.filter((o) => o._id === id)[0].price;
  const qty = event.target
    .closest('.product_wrap')
    .querySelector('.product_qty');

  priceSum -= price * Number(qty.innerText);
  priceSumElement.innerText = `${priceSum.toLocaleString()} 원`;

  savedCartData = savedCartData.filter((o) => o._id !== id);
  if (savedCartData.length === 0) {
    localStorage.removeItem('meowStoreCart');
    priceSumElement.innerText = '0 원';
  } else {
    localStorage.setItem('meowStoreCart', JSON.stringify(savedCartData));
  }
}

function deleteAll() {
  const userConfirm = confirm('장바구니를 비우시겠습니까?');
  if (userConfirm) {
    localStorage.removeItem('meowStoreCart');
    cartList.innerHTML = '';
    priceSumElement.innerText = '0 원';
  }
}
deleteAllBtn.addEventListener('click', deleteAll);

orderBtn.addEventListener('click', () => {
  if (!localStorage.getItem('meowStoreCart')) {
    alert('장바구니에 상품이 없습니다.');
    return;
  }
  location.href = '/order-create/';
  //TODO:onclick 지울것
  // if (localStorage.getItem('token')) location.href = '/order-create/';
  // else alert('로그인 후 주문 가능합니다.');
});
