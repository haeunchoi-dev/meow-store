import { blockIfNotLogin } from '/views/utils/index.js';
blockIfNotLogin();
import * as API from '/views/api/index.js';
const password = document.querySelector('#password');
const newPassword = document.querySelector('#new-password');
const checkPassword = document.querySelector('#new-password-check');
const button = document.querySelector('.changeButton');

button.addEventListener('click', check);
async function check() {
  if (
    password.value === '' ||
    newPassword.value === '' ||
    checkPassword.value === ''
  ) {
    alert('비밀번호를 입력해주세요.');
    return;
  }
  if (newPassword.value !== checkPassword.value) {
    alert('새로운 비밀번호가 일치하지 않습니다.');
    return;
  }
  const result = await API.post('/api/user/mypage', {
    currentPassword: password.value,
    password: newPassword.value,
  });
  console.log(result);
  alert('비밀번호 변경이 완료되었습니다.');
  window.location.href = '/mypage';
}
