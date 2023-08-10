import { blockIfNotLogin } from '/views/utils/index.js';
import * as API from '/views/api/index.js';

blockIfNotLogin();
// confirm창이 2번뜨는 문제 발생
const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', deleteUser);

async function deleteUser() {
  const password = document.getElementById('password').value;
  if (password === '') {
    alert('비밀번호를 입력하세요');
    return false;
  }
  if (confirm('정말 탈퇴하시겠습니까?')) {
    try {
      await API.delete('/api/user/mypage', '', {
        password,
      });
      alert('탈퇴가 완료 되었습니다.');
      window.location.href = '/';
    } catch (err) {
      alert(err.message);
    }
  } else {
    console.log('취소');
  }
}
