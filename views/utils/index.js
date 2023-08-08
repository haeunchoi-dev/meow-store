import { addLoadingBar } from '/views/components/LoadingBar.js';
import * as API from '/views/api/index.js';

export const blockIfLogin = () => {
  const token = getCookie('loginToken');
  if (token) {
    addLoadingBar();
    setTimeout(() => {
      alert('로그인 한 상태에서는 접근할 수 없는 페이지입니다.');
      window.location.replace(`/`);
    }, 10);
  }
};

export const blockIfNotLogin = async () => {
  const pathname = window.location.pathname;
  const search = window.location.search;
  try {
    await API.get('/api/user/auth/check');
  } catch (err) {
    addLoadingBar();
    setTimeout(() => {
      alert('로그인 하지 않은 상태에서는 접근할 수 없는 페이지입니다.');
      window.location.replace(`/login?previouspage=${pathname + search}`);
    }, 10);
  }
};

export const blockIfNotAdmin = async () => {
  try {
    await API.get('/api/user/admin/check');
  } catch (err) {
    addLoadingBar();
    setTimeout(() => {
      alert('관리자 전용 페이지입니다.');
      window.location.replace('/');
    }, 10);
  }
};

export const navigate = (pathname) => {
  return function () {
    window.location.href = pathname;
  };
};

// 긴 문자열에서 뒷부분을 ..으로 바꿈
export const compressString = (string) => {
  if (string.length > 10) {
    return string.substring(0, 9) + '..';
  }
  return string;
};

// 주소에 특정 params가 없다면 잘못된 접근으로 하고 싶은 경우 사용.
export const checkUrlParams = (key) => {
  const { [key]: params } = getUrlParams();

  if (!params) {
    window.location.replace('/page-not-found');
  }
};

export const getUrlParams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const result = {};

  for (const [key, value] of urlParams) {
    result[key] = value;
  }

  return result;
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const isNull = (str) => {
  return str === null || str === undefined || str === '';
};

export const getCookie = (cookieName) => {
  const cookieMap = {};
  const cookies = document.cookie.split(';').map((c) => c.trim());

  for (const cookie of cookies) {
    const separatorIndex = cookie.indexOf('=');
    const name = cookie.slice(0, separatorIndex),
      value = cookie.slice(separatorIndex + 1);
    cookieMap[name] = value;
  }

  return cookieMap[cookieName] || null;
};
