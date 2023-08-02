class CommonFooter extends HTMLElement {
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
  
          .footer {
            background-color: #fafafa;
            padding: 2rem 1.5rem 2rem;
            text-align: center;
          }
          .footer .footer-area {
            width: 1280px;
            margin: 0 auto;
          }
          .footer-area .img-box {
            width: 200px;
            height: 60px;
          }
          .footer-area .img-box img {
            width: 100%;
            height: 100%;
          }
          .footer .footer-area > p {
            display: inline-block;
          }
          .footer .footer-area .content-area > p {
            display: inline-block;
            margin: 10px 35px 0 0;
            font-family: system-ui;
            font-size: 15px;
          }
          .footer .footer-area .content-area {
            width: 50%;
            text-align: left;
          }
          .footer .footer-area .content-area p:last-child {
            font-size: 11px;
            color: #8d8d8d;
          }
      `;
    this.shadow.appendChild(style);
  }

  render() {
    // 아이콘 저작권
    //freeiconspng.com

    const template = `
    <footer class="footer">
        <div class="footer-area">
            <div class="footer-left">
                <div class="img-box">
                <img src="http://${location.host}/assets/로고.png" alt="로고"/>
                </div>
                <div class="content-area">
                <p>대표자 : 최하은</p>
                <p>회사명 : 야옹잡화점</p>
                <p>대표이메일 : meowstore@moewmoew.com</p>
                <p>주소: 서울특별시 성동구 성수2가제3동 광나루로6길 49 성수낙낙</p>
                <p class="copyright">Copyright © meowstore. all right reserved</p>
                </div>
            </div>
        </div>
    </footer>
      `;

    this.shadow.innerHTML = template;
    this.setStyle();
  }
}

customElements.define('common-footer', CommonFooter);
