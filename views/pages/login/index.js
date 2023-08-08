import {
  getUrlParams,
  validateEmail,
  blockIfLogin,
} from '/views/utils/index.js';
blockIfLogin();
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

email.addEventListener('focusout', (e) => {
  const iconNodes = e.target.closest('.field').querySelectorAll('.icon');

  //checkemail
  if (!validateEmail(e.target.value.trim())) {
    iconNodes.forEach((icon) => {
      icon.classList.remove('active');
    });
  } else {
    iconNodes.forEach((icon) => {
      icon.classList.add('active');
    });
  }
});

password.addEventListener('focusout', (e) => {
  const iconNodes = e.target.closest('.field').querySelectorAll('.icon');

  if (e.target.value.trim() === '') {
    iconNodes.forEach((icon) => {
      icon.classList.remove('active');
    });
  } else {
    iconNodes.forEach((icon) => {
      icon.classList.add('active');
    });
  }
});

loginBtn.addEventListener('click', login);

async function login() {
  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      alert(`정상적으로 로그인되었습니다.`);
      const { previouspage } = getUrlParams();

      if (previouspage) {
        window.location.href = previouspage;

        return;
      }
      window.location.href = '/';
    } else {
      if (data.message) {
        alert(data.message);
      }
    }
  } catch (e) {
    console.log('error msg: ', e);
  }
}
