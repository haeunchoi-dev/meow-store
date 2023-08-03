import { blockIfNotLogin, isNull } from '/views/utils/index.js';
blockIfNotLogin();
import * as API from '/views/api/index.js';

const urlParams = new URLSearchParams(window.location.search); // http://localhost:3000/product-details/?id=64a8b5c760e6ded9c555e247
const id = urlParams.get('id');

if (!id) {
  location.href = '/';
}

const infoResetBtn = document.getElementById('infoResetBtn');
const infoChangeBtn = document.getElementById('infoChangeBtn');
const infoEditModeBtn = document.getElementById('infoEditModeBtn');
const receiver = document.getElementById('receiver');
const receiverInput = document.getElementById('receiverInput');
const contact = document.getElementById('contact');
const contactInput = document.getElementById('contactInput');
const zipCode = document.getElementById('zipCode');
const zipCodeInput = document.getElementById('zipCodeInput');
const zipCodeBtn = document.getElementById('zipCodeBtn');
const address = document.getElementById('address');
const addressInput = document.getElementById('addressInput');
const detailAddress = document.getElementById('detailAddress');
const detailAddressInput = document.getElementById('detailAddressInput');
const shippingMessage = document.getElementById('shippingMessage');
const shippingMessageInput = document.getElementById('shippingMessageInput');
const shippingInfoDiv = document.getElementById('shippingInfoDiv');
const totalAmountDiv = document.getElementById('totalAmount');
let isCancle = true;

infoResetBtn.addEventListener('click', () => {
  initEditShippingInfo();
  showShippingViewMode();
});
infoChangeBtn.addEventListener('click', () => {
  saveOrderDeatil();
});
infoEditModeBtn.addEventListener('click', showShippingEditMode);

zipCodeBtn.addEventListener('click', () => {
  new daum.Postcode({
    oncomplete: function (data) {
      zipCodeInput.value = data.zonecode;
      addressInput.value = data.address;
    },
  }).open();
});

getOrderDetail();

async function getOrderDetail() {
  const data = await API.get(`/api/member/order/${id}`);

  console.log(data);

  //수정모드 판별
  //결제완료 단계에서만 수정가능
  isCancle = data.order.status === '취소';
  checkStatus(data.order.status);
  initShippingInfo(data.order);
  initProductList(data.orderItemList);

  totalAmountDiv.innerHTML = `총 결제금액: ${Number(
    data.order.totalPrice,
  ).toLocaleString()}원`;
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
async function saveOrderDeatil() {
  //validation 필요함
  if (!checkValidation()) return;
  const data = {
    receiver: receiverInput.value,
    receiverContact: contactInput.value,
    zipCode: zipCodeInput.value,
    address: addressInput.value,
    detailAddress: detailAddressInput.value,
    shippingMessage: shippingMessageInput.value,
  };
  const result = await API.post(`/api/member/order/${id}/info`, data);

  alert('배송지 정보가 수정되었습니다.');
  initShippingInfo(data);
  showShippingViewMode();
}

function initShippingInfo(info) {
  receiver.innerText = info.receiver;
  receiverInput.value = info.receiver;
  contact.innerText = info.receiverContact;
  contactInput.value = info.receiverContact;
  zipCode.innerText = info.zipCode;
  zipCodeInput.value = info.zipCode;
  address.innerText = info.address;
  addressInput.value = info.address;
  detailAddress.innerText = info.detailAddress;
  detailAddressInput.value = info.detailAddress;
  shippingMessage.innerText = info.shippingMessage;
  shippingMessageInput.value = info.shippingMessage;
}

function initEditShippingInfo() {
  receiverInput.value = receiver.innerText.trim();
  contactInput.value = contact.innerText.trim();
  zipCodeInput.value = zipCode.innerText.trim();
  addressInput.value = address.innerText.trim();
  detailAddressInput.value = detailAddress.innerText.trim();
  shippingMessageInput.value = shippingMessage.innerText.trim();
}

function showShippingEditMode() {
  shippingInfoDiv.querySelectorAll('.view').forEach((obj) => {
    obj.classList.add('none');
  });
  shippingInfoDiv.querySelectorAll('.edit').forEach((obj) => {
    obj.classList.remove('none');
  });
}

function showShippingViewMode() {
  shippingInfoDiv.querySelectorAll('.view').forEach((obj) => {
    obj.classList.remove('none');
  });
  shippingInfoDiv.querySelectorAll('.edit').forEach((obj) => {
    obj.classList.add('none');
  });
}

//여기서 부터 제품 리스트
const orderContainer = document.getElementById('orderContainer');
const resetBtn = document.getElementById('resetBtn');
const changeBtn = document.getElementById('changeBtn');
const editModeBtn = document.getElementById('editModeBtn');
const orderTbody = document.getElementById('orderTbody');
const cacleTotalAmountDiv = document.getElementById('cacleTotalAmount');
let cacleTotalAmount = 0;
let cancleProductList = [];

resetBtn.addEventListener('click', () => {
  initEditInfo();
  showViewMode();
});
changeBtn.addEventListener('click', () => {
  saveChangeProduct();
});
editModeBtn.addEventListener('click', showEditMode);

function initProduct() {
  cancleProductList = [];
}

function initProductList(list) {
  cacleTotalAmount = 0;
  initProduct();
  let html = '';

  list.forEach((product) => {
    html += `<tr cancelYn="${product.cancelYn}" id=${product._id} totalPrice="${
      product.totalPrice
    }" >
        <td class="product-td">
        ${
          product.cancelYn === 'Y'
            ? ''
            : `<div class="control-product edit none" >
                <span class="minus icon has-text-danger"><i class="fas fa-minus"></i></span>
                <span class="plus icon has-text-success none"><i class="fas fa-plus"></i></span>
              </div>`
        }
          <div class="product-div">
            <img src="${product.productId.repImgUrl}" width="50">
            <span class="product-name ${
              isCancle || product.cancelYn === 'Y' ? 'strikethrough' : ''
            }">${product.productId.name}</span>
          </div>
        </td>
        <td class="product-qty ${
          isCancle || product.cancelYn === 'Y' ? 'strikethrough' : ''
        }" >${product.quantity}</td>
        <td class="product-price ${
          isCancle || product.cancelYn === 'Y' ? 'strikethrough' : ''
        }" >${Number(product.totalPrice).toLocaleString()}원</td>
      </tr>`;
    if (isCancle || product.cancelYn === 'Y') {
      cacleTotalAmount += Number(product.totalPrice);
    }
  });

  orderTbody.innerHTML = html;
  updateCancleTotalAmount();

  orderTbody.querySelectorAll('.minus').forEach((obj) => {
    obj.removeEventListener('click', minusProduct);
    obj.addEventListener('click', minusProduct);
  });

  orderTbody.querySelectorAll('.plus').forEach((obj) => {
    obj.removeEventListener('click', plusProduct);
    obj.addEventListener('click', plusProduct);
  });
}

async function saveChangeProduct() {
  console.log(cancleProductList);
  if (cancleProductList.length > 0) {
    const result = await API.delete(`/api/member/order/${id}/products`, '', {
      orderItemIds: cancleProductList,
    });
    alert('주문 상품 정보가 수정되었습니다.');
    isCancle = result.order.status === '취소';
    if (isCancle) {
      location.reload(true);
    }
    initProductList(result.orderItemList);
  }

  showViewMode();
}

function minusProduct(event) {
  const tr = event.target.closest('tr');
  const orderId = tr.getAttribute('id');
  const totalPrice = Number(tr.getAttribute('totalPrice'));

  cancleProductList.push(orderId);
  cacleTotalAmount += totalPrice;

  tr.querySelector('.product-name').classList.add('strikethrough');
  tr.querySelector('.product-qty').classList.add('strikethrough');
  tr.querySelector('.product-price').classList.add('strikethrough');

  tr.querySelector('.plus').classList.remove('none');
  tr.querySelector('.minus').classList.add('none');
  updateCancleTotalAmount();
}

function plusProduct(event) {
  const tr = event.target.closest('tr');
  const orderId = tr.getAttribute('id');
  const totalPrice = Number(tr.getAttribute('totalPrice'));

  cancleProductList = cancleProductList.filter((idx) => idx !== orderId);
  cacleTotalAmount -= totalPrice;

  tr.querySelector('.product-name').classList.remove('strikethrough');
  tr.querySelector('.product-qty').classList.remove('strikethrough');
  tr.querySelector('.product-price').classList.remove('strikethrough');

  tr.querySelector('.plus').classList.add('none');
  tr.querySelector('.minus').classList.remove('none');
  updateCancleTotalAmount();
}

function showEditMode() {
  orderContainer.querySelectorAll('.view').forEach((obj) => {
    obj.classList.add('none');
  });
  orderContainer.querySelectorAll('.edit').forEach((obj) => {
    obj.classList.remove('none');
  });
}

function showViewMode() {
  orderContainer.querySelectorAll('.view').forEach((obj) => {
    obj.classList.remove('none');
  });
  orderContainer.querySelectorAll('.edit').forEach((obj) => {
    obj.classList.add('none');
  });
}

function initEditInfo() {
  initProduct();
  cacleTotalAmount = 0;

  orderTbody.querySelectorAll('tr').forEach((tr) => {
    const cancelYn = tr.getAttribute('cancelYn');
    if (cancelYn !== 'Y') {
      tr.querySelectorAll('.strikethrough').forEach((o) =>
        o.classList.remove('strikethrough'),
      );
    }
    const price = Number(tr.getAttribute('totalPrice'));
    if (isCancle || cancelYn === 'Y') {
      cacleTotalAmount += price;
    }
    tr.querySelector('.minus')?.classList.remove('none');
    tr.querySelector('.plus')?.classList.add('none');
  });

  updateCancleTotalAmount();
}

function checkStatus(status) {
  if (status === '결제완료') {
    infoEditModeBtn.classList.remove('none');
    editModeBtn.classList.remove('none');
  } else {
    infoEditModeBtn.classList.add('none');
    editModeBtn.classList.add('none');
  }
}

// 총액 업데이트
function updateCancleTotalAmount() {
  if (cacleTotalAmount === 0) {
    cacleTotalAmountDiv.innerHTML = '';
  } else {
    cacleTotalAmountDiv.innerHTML = `총 환불금액: ${cacleTotalAmount.toLocaleString()}원`;
  }
}
