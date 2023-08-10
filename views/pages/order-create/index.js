import { isNull } from '/views/utils/index.js';
import * as API from '/views/api/index.js';
import Cart from '/views/store/cart.js';

const receiverInput = document.querySelector('#receiver');
const contactInput = document.querySelector('#contact');
const zipCodeInput = document.querySelector('#zip_code');
const searchZipCodeBtn = document.querySelector('#search_zip_code');
const addressInput = document.querySelector('#address');
const detailAddressInput = document.querySelector('#detail_address');
const messageInput = document.querySelector('#message');
const orderBtn = document.querySelector('#order_btn');
const orderList = document.querySelector('.order_list');
const priceSumElement = document.querySelector('#price_sum');

let priceSum = 0;
let dataToPost = {
  receiver: '',
  receiverContact: '',
  zipCode: 0,
  address: '',
  detailAddress: '',
  shippingMessage: '',
  totalPrice: 0,
  orderItemList: [],
};

addAllElements();
addAllEvents();

async function addAllElements() {
  await getUserInfo();

  const savedCartData = Cart.selectAll();
  for (let i = 0; i < savedCartData.length; ++i) {
    const data = savedCartData[i];
    const subTotal = data.price * data.qty;
    priceSum += subTotal;
    const temp = {
      productId: data._id,
      quantity: data.qty,
      totalPrice: subTotal,
    };
    dataToPost.orderItemList.push(temp);

    const content = `
      <div class="product_wrap" product_id="${data._id}">
        <div class="thumbnail_wrap">
          <img src="${
            data.repImgUrl
          }" class="product_thumbnail" alt="thumbnail"/>
        </div>
        <div class="product_info">
          <span class="product_name">${data.name}</span>
          <span class="product_qty">${data.qty}개</span>
          <span class="product_price">${subTotal.toLocaleString()}원</span>
        </div>
      </div>
    `;
    const newLi = document.createElement('li');
    newLi.innerHTML = content;
    orderList.appendChild(newLi);
  }
  priceSumElement.innerText = priceSum.toLocaleString();
}

function addAllEvents() {
  searchZipCodeBtn.addEventListener('click', searchZipCode);
  orderBtn.addEventListener('click', createOrder);
}

async function getUserInfo() {
  const data = await API.get(`/api/user/mypage/`);
  if (data.result === 'forbidden-approach') {
    alert('로그인 후 주문이 가능합니다.');
    location.href = '/cart/';
  }
  receiverInput.value = `${data.name}`;
  contactInput.value = `${data.contact}`;
  zipCodeInput.value = `${data.address.zipCode}`;
  addressInput.value = `${data.address.address}`;
  detailAddressInput.value = `${data.address.detailAddress}`;
}

function searchZipCode() {
  new daum.Postcode({
    oncomplete: function (data) {
      zipCodeInput.value = data.zonecode;
      addressInput.value = data.address;
    },
  }).open();
}

function checkValidation() {
  if (isNull(receiverInput.value)) {
    receiverInput.focus();
    alert('수령인을 입력해 주세요.');
    return false;
  }
  if (isNull(contactInput.value)) {
    contactInput.focus();
    alert('연락처를 입력해 주세요.');
    return false;
  }
  if (isNull(zipCodeInput.value)) {
    alert('배송지를 입력해 주세요.');
    return false;
  }
  if (isNull(addressInput.value)) {
    addressInput.focus();
    alert('배송지를 입력해 주세요.');
    return false;
  }

  return true;
}

async function createOrder(event) {
  if (!checkValidation()) return;
  event.preventDefault();
  dataToPost.receiver = receiverInput.value;
  dataToPost.receiverContact = contactInput.value;
  dataToPost.zipCode = zipCodeInput.value;
  dataToPost.address = addressInput.value;
  dataToPost.detailAddress = detailAddressInput.value;
  dataToPost.shippingMessage = messageInput.value;
  dataToPost.totalPrice = priceSum;

  const userConfirm = confirm('결제하시겠습니까?');
  if (userConfirm) {
    const result = await API.post('/api/member/order', dataToPost);
    location.href = `/order-complete/?id=${result}`;
  }
}
