import { getCookie } from '/utils/index.js';
class AdminHeader extends HTMLElement {
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
            }
            
            .mainNav li:hover {
              background-color: #84776e;
            }

            .mainNav a:hover {
                color: whitesmoke;
            }
            
            li.active {
              background-color: #84776e;
            }
            .active a {
                color: whitesmoke;
            }

            .mainNav a {
                width: 100%;
                text-align: center;
                box-sizing: border-box;
                padding: 10px;
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
      `;
    this.shadow.appendChild(style);
  }

  render() {
    const template = `
    <header class="header">
      <div class="logo-container">
        <div class="logo">
        <div class="img-box">
            <a href ='/admin/product/'>
                <img src="http://${location.host}/assets/로고.png" alt="로고">
            </a>
        </div>
        <div class="span-container">
            <span class="user-home">사용자 홈</span>
        </div>
        </div>
    </div>  
    <nav class = "mainNav">
        <ul>
        <!-- <li ep="/admin/home/" class="active" onclick="clickNav('home')">현황</li>  -->
        <li ep="/admin/product/"><a href = '/admin/product'>상품관리</a></li>     
        <li ep="/admin/category/"><a href = '/admin/category'>카테고리 관리</a></li> 
        <li ep="/admin/order/"><a href = '/admin/order'>주문관리</a></li> 
        </ul>
    </nav>
    </header>
      `;

    this.shadow.innerHTML = template;
    this.setStyle();
    this.setEvent();
  }

  setEvent() {
    const self = this;
    const admin = getCookie('isAdmin');
    const userHome = self.shadow.querySelector('.user-home');
    const mainNav = self.shadow.querySelector('.mainNav');

    if (admin) {
      userHome.style.display = 'inline-block';
      userHome.addEventListener('click', function () {
        window.location.href = '/';
      });
    }

    const endpoint = window.location.pathname.trim();
    checkNav(endpoint);

    function checkNav(ep) {
      const lis = mainNav.querySelectorAll('li');
      lis.forEach((li) => {
        li.classList.remove('active');
        if (li.getAttribute('ep').trim() === ep) {
          li.classList.add('active');
        }
      });
    }
  }
}
customElements.define('admin-header', AdminHeader);
