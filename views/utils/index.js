export const checkLogin = () => {
  const token = getCookie('loginToken');
  if (!token) {
    // 현재 페이지의 url 주소 추출하기
    const pathname = window.location.pathname;
    const search = window.location.search;

    // 로그인 후 다시 지금 페이지로 자동으로 돌아가도록 하기 위한 준비작업임.
    window.location.replace(`/login?previouspage=${pathname + search}`);
  }
};

export const checkAdmin = async () => {
  const token = lgetCookie('loginToken');

  if (!token) {
    // 현재 페이지의 url 주소 추출하기
    const pathname = window.location.pathname;
    const search = window.location.search;

    // 로그인 후 다시 지금 페이지로 자동으로 돌아가도록 하기 위한 준비작업임.
    window.location.replace(`/login?previouspage=${pathname + search}`);
  }

  // 관리자 토큰 여부 확인
  const res = await fetch('/api/admin/check', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { result } = await res.json();

  if (result !== 'success') {
    alert('관리자 전용 페이지입니다.');

    window.location.replace('/');
  }
};

export const blockIfLogin = () => {
  // const token = localStorage.getItem('token');
  // if (token) {
  //   alert('로그인 한 상태에서는 접근할 수 없는 페이지입니다.');
  //   window.location.replace('/');
  // }
};

export const blockIfNotLogin = () => {
  // const token = localStorage.getItem('token');
  // if (!token) {
  //   alert('로그인 하지 않은 상태에서는 접근할 수 없는 페이지입니다.');
  //   window.location.replace('/');
  // }
};

export const blockIfNotAdmin = () => {
  // const admin = localStorage.getItem('admin');
  // if (!admin) {
  //   alert('관리자 전용 페이지입니다.');
  //   window.location.replace('/');
  // }
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
