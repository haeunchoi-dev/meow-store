class MypageAside extends HTMLElement {
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
  
          aside.aside-tab {
            display: inline-block;
            background-color: #fff8c6;
            height: 500px;
            vertical-align: top;
          }
          .aside-tab {
            padding: 10px 16px;
          }
          .aside-tab ul li {
            margin-left: 30px;
            padding: 8px 0;
            list-style: none;
          }
          .aside-tab ul li a{
            text-decoration: none;
            color: #756d6d;
          }
          .aside-tab ul > div {
            /* margin: 7px 0; */
            margin-bottom: 7px;
          }
          .aside-tab .bold {
            font-size: large;
          }
          .aside-tab .title span {
            display: block;
            margin-bottom: 15px;
            font-weight: bold;
            cursor: pointer;
            font-size: 19px;
          }
          .aside-tab li:hover {
            background-color: rgb(83 81 78 / 13%);
          }
          
      `;
    this.shadow.appendChild(style);
  }

  render() {
    const template = `
    <aside class="aside-tab">
      <div class="side-section">
        <div class="title">
        <span>마이페이지</span>
        </div>
        <ul>
            <div>
            <span class="bold">쇼핑정보</span>
            </div>
            <li><a href="/purchase">- 구매내역</a></li>
            <ul>
            <div>
                <span class="bold">회원 정보</span>
            </div>
            <li>
                <a href="/mypage/modify-info">- 사용자 정보 변경</a>
            </li>
            <li><a href="/mypage/modify-password">- 비밀번호 변경</a></li>
            <li><a href="/mypage/delete-user">- 회원 탈퇴</a></li>
            </ul>
        </ul>
        </div>
    </aside>
      `;

    this.shadow.innerHTML = template;
    this.setStyle();
    this.setEvent();
  }

  setEvent() {
    const self = this;
    const title = self.shadow.querySelector('.title');
    title.addEventListener('click', function () {
      window.location.href = '/mypage';
    });
  }
}

customElements.define('mypage-aside', MypageAside);
