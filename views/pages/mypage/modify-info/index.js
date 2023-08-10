import { blockIfNotLogin } from '/views/utils/index.js';
import * as API from '/views/api/index.js';

blockIfNotLogin();

const addressValue = document.querySelector('#address-input');
const cansleButton = document.querySelector('.cansle-button');
const email = document.querySelector('.email');
const nameValue = document.querySelector('#name-input');
const phoneNumberInput = document.querySelector('#phone-number');
const addressDetailInput = document.querySelector('#address-detail-input');
const addressZipCode = document.querySelector('#address-zip-input');
const saveButton = document.querySelector('.save-button');
const phoneSpan = document.querySelector('.check.phone');

let validation = '';
let numberFlag = false;

addAllElements();
addAllEvents();

async function addAllElements() {
  document
    .querySelector('.modify-address')
    .addEventListener('click', function () {
      new daum.Postcode({
        oncomplete: function (data) {
          addressZipCode.value = data.zonecode; // 주소 넣기
          addressValue.value = data.address; // 주소 넣기
        },
      }).open();
    });

  await getUserInfo();
}

function addAllEvents() {
  phoneNumberInput.addEventListener('blur', function () {
    let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!regPhone.test(phoneNumberInput.value)) {
      phoneSpan.style.display = 'block';
      phoneSpan.textContent = '휴대폰 번호를 정확하게 입력하세요.';
      numberFlag = false;
      console.log(numberFlag);
      return;
    }
    phoneNumberInput.value = phoneNumberInput.value.replace(
      /^(\d{2,3})(\d{3,4})(\d{4})$/,
      `$1-$2-$3`,
    );
    numberFlag = true;
    phoneSpan.style.display = 'none';
  });

  cansleButton.addEventListener('click', function () {
    window.location.href = '/mypage';
  });

  saveButton.addEventListener('click', function () {
    if (phoneNumberInput.value === '') {
      alert('휴대번호를 입력하세요.');
      return;
    }
    if (
      addressValue.value === '' ||
      addressDetailInput.value === '' ||
      addressZipCode.value === ''
    ) {
      alert('주소를 입력하세요');
      return;
    }
    if (nameValue.value === '') {
      alert('이름을 입력하세요.');
      return;
    }
    if (!numberFlag) {
      alert('전화번호를 올바르게 입력하세요.');
      return;
    }
    modifyUserInfo();
  });
}

async function getUserInfo() {
  const data = await API.get(`/api/user/mypage/`);
  nameValue.value = `${data.name}`;
  email.textContent = `${data.email}`;
  phoneNumberInput.value = `${data.contact}`;
  addressValue.value = `${data.address.address}`;
  addressDetailInput.value = `${data.address.detailAddress}`;
  addressZipCode.value = `${data.address.zipCode}`;
  validation = data._id;
  console.log(data);
  numberFlag = true;
}

async function modifyUserInfo() {
  const result = await API.post('/api/user/mypage', {
    contact: phoneNumberInput.value,
    name: nameValue.value,
    address: {
      address: addressValue.value,
      detailAddress: addressDetailInput.value,
      zipCode: addressZipCode.value,
    },
  });
  if (validation === result.updatedUser._id) {
    alert('정보 수정이 완료 되었습니다.');
    window.location.href = '/mypage';
  } else {
    alert(result);
    return;
  }
}
