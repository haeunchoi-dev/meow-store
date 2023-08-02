import { getCookie } from '/utils/index.js';
import { put } from '/api/index.js';
class CommonHeader extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  setStyle() {
    const style = document.createElement('style');

    style.textContent = `
        body, div, ul, ol, li,
        h1, h2, h3, h4, h5, h6,
        form, p, button {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        }

        a {
            text-decoration: none;
            color: #756d6d;
          }
          /* 헤더 스타일 */
          .header {
            background-color: #fffdf4;
            padding: 20px;
            flex-direction: column;
          
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          
          /* 로고 */
          .logo-container {
            position: relative;
            padding: 20px 5px;
          }
          
          .logo-container .logo .img-box {
            width: 300px;
            height: 90px;
            margin: 0 auto;
          }
          .logo-container .logo img {
            width: 100%;
            height: 100%;
          }
          /* 헤더 아이콘 */
          /* .logo-container i {
            display: inline-block;
            width: 40px;
            height: 40px;
            margin-left: 10px;
          } */
          .span-container a {
            border-left: 1px solid black;
          }
          .span-container span {
            padding: 3px 7px;
            line-height: 1;
            vertical-align: middle;
            font-size: 15px;
            color: black;
          }
          .span-container .mypage {
            display: none;
          }
          .span-container button {
            vertical-align: middle;
            display: none;
          }
          .span-container button.admin-home {
            margin: 0 auto;
          }
          
          .logout-button {
            box-shadow: inset 0px 1px 0px 0px #ffffff;
            background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
            background-color: #ffffff;
            border-radius: 6px;
            border: 1px solid #dcdcdc;
            display: inline-block;
            cursor: pointer;
            color: #666666;
            font-family: Arial;
            font-weight: bold;
            padding: 6px 24px;
            text-decoration: none;
            text-shadow: 0px 1px 0px #ffffff;
          
            margin-top: 6px;
            cursor: pointer;
            display: inline-block;
            vertical-align: top;
          }
          .logout-button:hover {
            background: linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
            background-color: #f6f6f6;
          }
          
          .logo-container .span-container {
            position: absolute;
            right: 13%;
            top: 50px;
            /* bottom: 63px; */
          }
          
          /* 내비게이션 스타일 */
          .mainNav {
            background-color: #fffdf4;
            position: relative;
          }
          
          .mainNav ul {
            display: flex;
            padding: 12px 0 0 0;
            margin: 0;
          }
          
          .mainNav li {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgb(100, 100, 100);
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.5s;
            padding: 10px;
          }
          
          .mainNav li:hover {
            background-color: #84776e;
            color: whitesmoke;
          }
          
          li.active {
            background-color: #84776e;
            color: whitesmoke;
          }

          /* 관리자 계정  */
            .span-container .admin {
            display: none;
            font-weight: bold;
            }
            .span-container .user-home {
            cursor: pointer;
            font-weight: bold;
            }

            /* category nav */

            .row-categorys {
            position: absolute;
            flex-direction: row;
            top: 60px;
            width: 100%;
            left: 0;
            justify-content: center;
            display: none;
            }

            .row-categorys.active {
            display: flex;
            }

            .row-category {
            background-color: #f8f8f8;
            border-radius: 35px;
            padding: 12px;
            margin-right: 15px;
            color: black;
            }

            .row-category:hover {
            background-color: #a39c97;
            color: white;
            }

            .row-category.active {
            background-color: #a39c97;
            color: white;
            }
    `;
    this.shadow.appendChild(style);
  }

  render() {
    const template = `
    <header class="header">
        <div class="logo-container">
            <div class="logo">
            <div class="img-box">
                <a href ='/'>
                  <img src="http://${location.host}/assets/로고.png" alt="로고">
                </a>
            </div>
            <div class="span-container">
                <a href = '/login'>
                <span class="header-span login-text">로그인</span>
                </a>
                <a href = '/cart'>
                <span class="header-span">장바구니</span>
                </a>
                <a href = '/mypage' class="mypage">
                    <span class="header-span">마이페이지</span>
                </a>
                <a href = '/admin/product'>
                <span class="header-span admin">관리자 페이지</span>
            </a>
            </div>
            </div>
        </div>  
    </header>
    `;

    this.shadow.innerHTML = template;
    this.setStyle();
    this.setEvent();
  }

  setEvent() {
    const self = this;
    const token = getCookie('loginToken');
    const admin = getCookie('isAdmin');

    const login = self.shadow.querySelector('.header-span.login-text');
    const mypage = self.shadow.querySelector('.mypage');
    const adminHome = self.shadow.querySelector('.admin');
    if (token) {
      login.textContent = '로그아웃';
      mypage.style.display = 'inline-block';
    }
    if (admin) {
      adminHome.style.display = 'inline-block';
    }

    login.addEventListener('click', function () {
      if (token) {
        logout();
        alert('로그아웃 되었습니다.');
        //window.location.href = '/';
      } else {
        window.location.href = '/login';
      }
    });
  }
}

async function logout() {
  try {
    await put(`/api/user/logout`);
  } catch (err) {
    console.log(err);
  }
}

customElements.define('common-header', CommonHeader);
